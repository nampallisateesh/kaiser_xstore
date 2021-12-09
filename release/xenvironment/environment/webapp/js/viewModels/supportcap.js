define(["ojs/ojcore","jraf/jrafcore","knockout","factories/SupportCaptureFileListFactory","jraf/models/UIShellManager","libs/xenvironment/urlService","ojs/ojknockout","ojs/ojlabel","ojs/ojcomposite","jraf/composites/oj-rgbu-jraf-apps-table/loader","jraf/composites/oj-rgbu-jraf-simple-grid/loader","jraf/composites/oj-rgbu-jraf-message-dialog/loader","jraf/composites/oj-rgbu-jraf-snackbar/loader","ojs/ojpagingcontrol"],(function(e,t,n,o,a,l){let r=e.Translations.getTranslatedString;return new function(e){let s=this;s.runSupCaptureButtonId=t.UIShell.generateUniqueId(),s.snackBarId=t.UIShell.generateUniqueId(),s.supportCapFileCollection=o.createSupportCapCollection(),s.deleteDialogElementId=t.UIShell.generateUniqueId(),s.supportCapTitle=r("xenv.main.SupportCapTitle"),s.generateSupportCap=n.observable(r("xenv.supportcap.GenerateSupportCap")),s.runSupportCap=function(){document.getElementById(s.runSupCaptureButtonId).setAttribute("disabled","true");let e=l.getSupportCapServiceUrl(),t=$.ajax(e,{type:"POST",dataType:"json",xhrFields:{withCredentials:!0}});d(r("xenv.supportcap.PleaseWait"),"info",5e3),a.startProcessingIndicator(),t.done((function(){d(r("xenv.supportcap.LogsCaptured"),"success",5e3),s.handleRefresh(),a.stopProcessingIndicator(),document.getElementById(s.runSupCaptureButtonId).setAttribute("disabled","false")})),t.fail((function(e,t,n){let o=n;null!==e.responseJSON&&null!==e.responseJSON.message&&""!==e.responseJSON.message&&(o=e.responseJSON.message);let l="error";null!==e.responseJSON&&null!==e.responseJSON.actionState&&"WARNING"===e.responseJSON.actionState&&(l="warning"),d(o,l,5e3),s.handleRefresh(),a.stopProcessingIndicator(),document.getElementById(s.runSupCaptureButtonId).setAttribute("disabled","false")}))},s.noDataLabel={msgNoData:r("xenv.general.NoData")},s.gridName=r("xenv.supportcap.FileList");let i=function(e){if(e.data){let t=document.createElement("div");return t.innerHTML='<a href="'+l.getSupportCapServiceUrl(e.data)+'">'+e.data+"</a>",t.title=e.data,t}return""},u=function(){let e=document.createElement("div"),t=document.createElement("img");return t.setAttribute("tabindex","0"),t.setAttribute("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAApklEQVR42mNgGAWjYBSQCkpKurkbGhpECKkDqQGppcgyoCFcVXVN+4D4Wml9vQQudZWVbaKVdU2XgOqOlJV18lJioUhVXfNFoEH/QTTIYGyWIashJjTwgoqKdkGgYWcgBqL6FMln1LEMn6VU9xmh4KWpZTh8SlvLMBMIZpwO3SDFlkDwpV6KLcOV9KluKd0zPqJow28QwqeNhykq2uheeI+CUTAyAQBhFOCc+9cjbwAAAABJRU5ErkJggg=="),t.setAttribute("aria-label",r("xenv.supportcap.Delete")),t.setAttribute("role","button"),e.appendChild(t),e};s.deleteDialog=function(){let e=s.selectedItems()[0].startKey.row;document.getElementById(s.deleteDialogElementId).messageText="Are you sure you wish to delete "+e+"?",document.getElementById(s.deleteDialogElementId).open()},s.cancelCallback=function(){document.getElementById(s.deleteDialogElementId).close(),s.handleRefresh()},s.deleteCallback=function(){1!==s.selectedItems().length&&console.error("Must have exactly one item selected for deletion.");let e=s.selectedItems()[0].startKey.row;console.info("Deleting: "+e),document.getElementById(s.deleteDialogElementId).close();let t=l.getSupportCapServiceUrl(e),n=$.ajax(t,{type:"DELETE",crossDomain:!0,dataType:"text",xhrFields:{withCredentials:!0}});n.done((function(){s.handleRefresh()})),n.fail((function(e,t,n){d(r("xenv.supportcap.CouldNotDelete")+n,"error",5e3),console.error("Could not delete file: "+n)}))},s.selectedItems=n.observableArray([]),s.handleRefresh=function(){s.selectedItems([]),s.supportCapFileCollection.refresh()};let d=function(e,t,n){null===n&&(n=2e3),console.info("Action result: "+e),document.getElementById(s.snackBarId).openSnack({message:e,severity:t,timeout:n})};s.initialize=function(){s.isAdmin=t.App.getAppDataProperty("xenvUserRoles").indexOf("XenvAdmin")>-1;let e="100%";s.isAdmin&&(e="90%"),s.gridColumns=[{label:r("xenv.supportcap.FileName"),valueName:"name",dataType:"custom",customRenderer:i,width:e,cellAlignment:"start",sortable:!1}],s.isAdmin&&s.gridColumns.push({label:"",valueName:"",dataType:"custom",customRenderer:u,width:"10%",cellAlignment:"center",sortable:!1,callback:s.deleteDialog})}}}));