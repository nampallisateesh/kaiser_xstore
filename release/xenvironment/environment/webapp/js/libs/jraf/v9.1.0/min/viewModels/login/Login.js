define(["ojs/ojcore","knockout","jraf/utils/ValidationUtils","jraf/models/UIShellManager","jraf/utils/RouterUtils","jraf/controllers/LayoutManager","ojs/ojknockout","ojs/ojcomposite","jraf/composites/oj-rgbu-jraf-message-dialog/loader","ojs/ojinputtext","ojs/ojbutton","ojs/ojlabel","ojs/ojformlayout"],(function(t,o,i,e,n,r){"use strict";var s=t.Translations.getTranslatedString;function a(e){if(!i.isObjectStrict(e)||!i.isFunction(e.getLoginHandlerCallback))throw new TypeError("Login: Invalid param(s).");var n=this,r=i.isNonemptyString(e.fromCopyrightYear)?e.fromCopyrightYear:"xxxx",a=i.isNonemptyString(e.toCopyrightYear)?e.toCopyrightYear:"xxxx";this.headerText=s("jraf.login.loginHeader"),this.userIdLabel=s("jraf.login.userName"),this.passwordLabel=s("jraf.login.password"),this.loginErrorMessage=s("jraf.login.loginErrorMessage"),this.loginLabel=s("jraf.login.login"),this.okButtonLabel=s("jraf.common.ok"),this.copyrightStatement=s("jraf.login.copyright",{fromYear:r,toYear:a}),this.trademarksStatement=s("jraf.login.trademarks"),this.xj=t.ResponsiveKnockoutUtils.createScreenRangeObservable(),this.isMobileLayout=o.pureComputed((function(){return this.xj()===t.ResponsiveUtils.SCREEN_RANGE.SM}),this),this.layoutFlexClasses=o.pureComputed((function(){return this.isMobileLayout()?"oj-flex":"oj-flex-bar oj-flex-items-pad"}),this),this.layoutFlexItemClasses=o.pureComputed((function(){return this.isMobileLayout()?"oj-flex-item":"oj-flex-bar-end"}),this),this.mobileLayoutInputtext=o.pureComputed((function(){return this.isMobileLayout()?"jraf-mobile-login-inputext":{}}),this),this.mobileLayoutButton=o.pureComputed((function(){return this.isMobileLayout()?"jraf-mobile-login-button":{}}),this),this.formLabelEdge=o.pureComputed((function(){return this.isMobileLayout()?"top":"start"}),this),this.userName=o.observable(""),this.pwd=o.observable(""),this.handlingLogin=o.observable(!1),this.loginHandler=e.getLoginHandlerCallback,this.processLogin=function(t){n.Lj(t)},this.dismissDialog=function(){n.Ej()},this.onSubmit=function(t){n.Mj(t)}}return a.prototype.Mj=function(t){t.preventDefault()},a.prototype.Lj=function(){t.Logger.info("Login._handleLogin: Entering.");var o=this;document.getElementById("uid").blur(),document.getElementById("pwd").blur(),e.startProcessingIndicator(),this.handlingLogin(!0),this.loginHandler(this.userName(),this.pwd()).then((function(){o.Uj()})).catch((function(){o._j()}))},a.prototype.Ij=function(){e.stopProcessingIndicator(),this.handlingLogin(!1)},a.prototype.Uj=function(){t.Logger.info("Login._handleLoginSuccess: Entering."),this.Ij(),n.go("Home")},a.prototype._j=function(){t.Logger.info("Login._handleLoginFailure: Entering."),this.Ij(),this.Sj().open()},a.prototype.Sj=function(){return document.getElementById("jraf-login-failed-dialog")},a}));