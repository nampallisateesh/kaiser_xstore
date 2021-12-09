def app

pipeline {

    agent {
        label 'master'
    }
    
     environment {
     
     	DOCKER_IMAGE_NAME = 'xstore_blick_linux_oracle'
     	DOCKER_FILE_DIRECTORY  = '/home/oracle/hbi/pos'
     	XSTORE_CONTAINER_NAME= "blick-node-1"
		DISPLAY='192.168.2.112:1'
		EMAIL_LIST_EXT="${params.MANAGER_EMAIL_ID}"
		ENABLED_TAGS="${params.ENABLED_TAGS}"
		DISABLED_TAGS=""
		CONFIG_PATH="test:version1:version1/patch"
		PROXY_URL="http://192.168.3.20:3128"
		PROJECT_NAME="XSTORE-BLICK"
		PROJECT_ENV="DEV"
		FTP_TYPE="HTTP-SERVER"
		HTTP_SERVER="http://192.168.2.112:444/testreport"
		HTTP_DIR="/var/www/html/testreport"
        SMTP_HOST="smtp.skillnetinc.net"
		SMTP_PORT="26"
		SMTP_USER="noreply1@skillnetinc.net"
		SMTP_PASS="aR7SFqf"
		SMTP_FROM="noreply1@skillnetinc.net"
				
     }
    


    stages {
        
        stage('Cleanup Activity') {
            steps {
             	echo 'cleaning pipeline workspace'
                echo 'cleaning puppet master directory'
               }
            when {
                expression {
                    return "${params.PIPELINE_ACTIVITY}" == 'deploy';
                }
            }
        }
		stage('Quality Check') {
            steps {
				
			   checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'SparseCheckoutPaths', sparseCheckoutPaths: [[path: '/ksr_pos/src/']]], [$class: 'RelativeTargetDirectory', relativeTargetDir: 'sonar']], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'nampallisateesh', url: 'https://github.com/nampallisateesh/kaiser_xstore.git']]])
               script {
                scannerHome = tool 'Sonar';
    			withSonarQubeEnv('Sonar') {
      			sh "${scannerHome}/bin/sonar-scanner -Dsonar.analysis.mode=publish -Dsonar.host.url=http://192.168.2.141 -Dsonar.projectKey=kaiser-ss -Dsonar.projectName=kaiser-ss -Dsonar.sources=./ksr_pos  -Dsonar.login=7ee21b7c661775db8729511a656b34a2fa4b71f6 -Dsonar.java.binaries=./ksr_pos"
    			}
    			
    		   }
				
            }
            when {
                expression {
                    return "${params.PIPELINE_ACTIVITY}" == 'deploy';
                }
            }
        }
        
        
   stage('Build & Copy Installer') {
            steps {
			  sh 'rm -rf installer'  
			  copyArtifacts filter: 'blick/distro-full/OracleRetailXstorePointofService*.zip', fingerprintArtifacts: true, flatten: true, projectName: 'BLICK_XUNIT_XSTORE', selector: specific("${params.XSTORE_BUILD_NUMBER}"), target: 'installer'
 
             
            }
            when {
                expression {
                    return "${params.PIPELINE_ACTIVITY}" == 'deploy';
                }
            }
        }
      
    stage('Build Docker Image') {
            steps {
        		
        		withEnv(["docker_server=${params.DOCKER_MACHINE_IP}"]) {
		      	sh '''
				    BASEDIR=$(pwd)
					DOCKDIR=/root/.jenkins/BLICK
					TDIR=$DOCKDIR/installertmp
					WORKDIR=/root/.jenkins/BLICK/blick_pos/pipeline
					ssh -t root@$docker_server "rm -rf $DOCKDIR/installer/*"
					scp -r blick_pos/pipeline/* root@$docker_server:$WORKDIR
				    scp installer/OracleRetailXstorePointofService*.zip root@$docker_server:$DOCKDIR/installer
					ssh -t root@$docker_server "chmod 777 $DOCKDIR/installer/OracleRetailXstorePointofService*.zip"
					ssh -t root@$docker_server "cp $DOCKDIR/installer/OracleRetailXstorePointofService*.zip $DOCKDIR/xstore.zip" 
						echo "#########################Starting xstore process#######################" 
						echo "########## Clean Up: Removing existing containers ###########################" 
					ssh root@$docker_server "if docker ps -a -f name=blick-node-1 | grep blick-node-1; then docker rm -f blick-node-1; fi"
					ssh root@$docker_server "if docker images -q xstore_blick_linux_oracle | grep xstore_blick_linux_oracle; then docker rmi -f xstore_blick_linux_oracle; fi"
					sleep 5
								
										
					ssh -t root@$docker_server	"unzip -o $DOCKDIR/xstore.zip -d $TDIR && cd $TDIR/18* && tar -cvf $WORKDIR/xstore.tar pos/ && cd $DOCKDIR && rm -rf $$TDIR && rm -rf $DOCKDIR/xstore.zip"
        		     
                    ssh -t root@$docker_server	"docker build -t $DOCKER_IMAGE_NAME $WORKDIR"
        			ssh -t root@$docker_server	"docker run -it -d -v /var/www/html/testreport:/var/www/html/testreport --name=$XSTORE_CONTAINER_NAME  -e DISPLAY=$DISPLAY -e JAVA_HOME=/usr/orps/java/jdk1.8.0_144 $DOCKER_IMAGE_NAME"				

		       		'''
       			}
       		
			
             }
            when {
                expression {
                    return "${params.PIPELINE_ACTIVITY}" == 'deploy';
                }
            }
        }

 		
      stage('Dev Testcases execution') {
            steps {
        		withEnv(["docker_server=${params.DOCKER_MACHINE_IP}"]) {
			   
			    sh '''
				
				  WORKDIR=/root/.jenkins/BLICK/blick_pos/pipeline
				
				 ssh -t root@$docker_server "mv $WORKDIR/truststore $WORKDIR/.truststore"
				                                                
				 echo "########## Copying XStore truststore: $XSTORE_CONTAINER_NAME ##############################" 
				 
				 ssh -t root@$docker_server "docker cp $WORKDIR/.truststore $XSTORE_CONTAINER_NAME:/home/oracle/xstore/res/ssl/"
				 
				 echo "########## Copying XStore HardwareConfig: $XSTORE_CONTAINER_NAME ##############################" 
				 
				 ssh -t root@$docker_server "docker cp $WORKDIR/cust_config $XSTORE_CONTAINER_NAME:/home/oracle/xstore/"
				
				 echo "########## Removing XStore directory: $WORKDIR ##############################"
				 
				 ssh root@$docker_server "rm -rf $WORKDIR/*"
				 
				 echo "########## Updating hostfile entry: $XSTORE_CONTAINER_NAME ##############################" 
				 
				 ssh root@$docker_server 'docker exec blick-node-1 /bin/bash -c echo "192.168.1.184 snsl-vm-284.ssipl.inc snsl-vm-284 >> /etc/hosts"'
				 
				 echo "########## Updating hostfile entry: $XSTORE_CONTAINER_NAME ##############################" 
				 
				 ssh root@$docker_server 'docker exec blick-node-1 /bin/bash -c "echo 192.168.1.37 snsl-vm-302.ssipl.inc snsl-vm-302 >> /etc/hosts"'
				 
				 echo "######################## Executing test cases on container: $XSTORE_CONTAINER_NAME Project-$PROJECT_NAME Env-$PROJECT_ENV Tags-$XUNIT_TAGS " 
						
				ssh root@$docker_server 'docker exec -e DISPLAY=192.168.2.112:1 -e EMAIL_LIST_EXT=prasad.kowli@skillnetinc.com,noopur.surana@skillnetinc.com -e ENABLED_TAGS=STORE_OPEN,REGISTER_OPEN,DEMO -e DISABLED_TAGS= -e CONFIG_PATH=test:version1:version1/patch -e PROXY_URL=http://192.168.3.20:3128 -e PROJECT_NAME=XSTORE-BLICK -e PROJECT_ENV=DEV -e FTP_TYPE=HTTP-SERVER -e HTTP_SERVER=http://192.168.2.112:444/testreport -e HTTP_DIR=/var/www/html/testreport -e SMTP_HOST=smtp.skillnetinc.net -e SMTP_PORT=26 -e SMTP_USER=noreply1@skillnetinc.net -e SMTP_PASS=aR7SFqf -e  SMTP_FROM=noreply1@skillnetinc.net blick-node-1 /bin/bash -c "cd /home/oracle/Skillnet-XUnit && chmod +x xunit.sh && sleep 5 &&  ./xunit.sh"'
				
                sleep 5
				 
				ssh -t root@$docker_server "docker rm -f $XSTORE_CONTAINER_NAME"
				 
				sleep 5
				 
				ssh -t root@$docker_server "docker rmi -f $DOCKER_IMAGE_NAME"
				
				'''
	
	   			 }
	
             }
             when {
                expression {
                  return "${params.ENVIRONMENT}".contains("dev")
                }
            }
           
        }
 
        
	}
	post {  
         failure {  
              script {
                        mail(to: "${env.MANAGER_EMAIL_ID}",
                        	from:'noreply1@skillnetinc.net',
                            subject: "ERROR CI: Project name :'${env.JOB_NAME}' (${env.BUILD_NUMBER}-${params.XSTORE_VERSION}) Failed",
                            body: "Pipeline Job - ${env.JOB_NAME} Failed, Please go to ${env.BUILD_URL}/");
                }
         }  
         unstable {  
             echo 'This will run only if the run was marked as unstable'  
         }  
     }  
    parameters {
        string(defaultValue: 'dev', description: '*Comma separated A) dev - Development environment </br> B) sit - SIT environment', name: 'ENVIRONMENT')
        choice(name: 'PIPELINE_ACTIVITY',choices: "deploy\ntest",description: 'A) deploy - Deploy & execute test cases  <br> \nB) test - Do not deploy only execute test cases <br>\n this is applicable for all environment' )
		string(defaultValue: 'prasad.kowli@skillnetinc.com,sonali.shetkar@skillnetinc.com', description: 'Email id of manager(s) who will approve pipeline stages (Comma separated values)', name: 'MANAGER_EMAIL_ID')
        string(defaultValue: '20', description: 'Build no of XStore installer to be installed', name: 'XSTORE_BUILD_NUMBER' )
        string(defaultValue: '18.0.1.0.74-1.0.2-0.0-blick', description: 'xstore version', name: 'XSTORE_VERSION')
        string(defaultValue: '192.168.2.83', description: 'IP of puppet master', name: 'PUPPET_MASTER_IP')
        
    }

}
