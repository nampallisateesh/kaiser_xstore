define(["jquery","ojs/ojcore","jraf/utils/UrlUtils","jraf/utils/ValidationUtils","jraf/services/AbstractService"],(function(t,e,r,i,a){"use strict";function s(t,e){if(s.superclass.constructor.apply(this,arguments),i.isObjectStrict(e)?(this.Nc=e.appCode,this.Sc=e.clientAppCode):this.Nc=e,!i.isNonemptyString(this.Nc))throw new TypeError("AppNavigatorService: App code is required")}return s.SERVICE_URL_PATH="services/private/AppNavigator",s.SERVICE_VERSION_OVERRIDE=null,e.Object.createSubclass(s,a,"AppNavigatorService"),s.prototype.Cc=function(t){var e=this.BuildEndpoint(t,s.SERVICE_URL_PATH);return this.Sc&&(e=r.injectQueryParameter(e,"clientAppCode",this.Sc)),e},s.prototype.GetStandardHeaders=function(){var t=s.superclass.GetStandardHeaders.apply(this);return t["Accept-Version"]=s.SERVICE_VERSION_OVERRIDE||t["Accept-Version"],t},s.prototype.loadNavigation=function(){var r=this.Cc("?appCode="+this.Nc),a=t.ajax(r,{headers:this.GetStandardHeaders(),dataType:"json",xhrFields:{withCredentials:!0}});return this.ConvertAjaxPromise(a).then((function(t){return i.isObjectStrict(t)&&i.isArray(t.appNavigatorItems)?t.appNavigatorItems:(e.Logger.warn("AppNavigatorService.loadNavigation: Returned data not in expected format"),[])}))},s}));