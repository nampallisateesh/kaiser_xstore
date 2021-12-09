define(["knockout","jraf/jrafcore","dompurify","ojs/ojlogger","ojs/ojtranslation","ojs/ojcontext","jraf/services/ServiceManager","jraf/models/UIShellManager","jraf/utils/ValidationUtils","ojs/ojarraydataprovider","ojs/ojhtmlutils","ojs/ojdialog","ojs/ojconveyorbelt","ojs/ojnavigationlist","ojs/ojbinddom","ojs/ojknockout","ojs/ojtoolbar","ojs/ojbutton"],(function(t,e,o,i,n,r,a,l,s,d,c){"use strict";var h=n.getTranslatedString;function u(o){if(!s.isObjectStrict(o)||!s.isNonemptyString(o.popupId)||!t.isObservable(o.notificationId))throw new TypeError("AlertsPopup: Invalid Parameters");var i=this;this.popupId=o.popupId,this.notificationId=o.notificationId,this.tabbarId=e.UIShell.generateUniqueId(),this.alertDetailsDivId=e.UIShell.generateUniqueId(),this.htmlFrameId=e.UIShell.generateUniqueId(),this.popupTitle=h("jraf.notifications.alerts.popupTitle"),this.doneButtonLabel=h("jraf.common.done"),this.onBeforeOpen=function(){i._handleBeforeOpen()},this.done=function(){i._closeDialog()},this.alertsData=t.observableArray([]),this.alertsDataProvider=new d(this.alertsData,{keyAttributes:"id"}),this.selectedAlertId=t.observable(null),this.selectedAttachment=t.observable(null),this.hasMultipleAlerts=t.pureComputed((function(){return this.alertsData().length>1}),this),this.selectedAlert=t.pureComputed((function(){for(var t=this.selectedAlertId(),e=null,o=0;o<this.alertsData().length;o++)if(this.alertsData()[o].id===t){e=this.alertsData()[o];break}return e}),this),this.selectedAlertSubject=t.pureComputed((function(){var t=this.selectedAlert();return t&&t.alertContext?t.alertContext.subject:""}),this),this.selectedAlertHasHtmlBody=t.pureComputed((function(){var t=this.selectedAlert();return t&&t.alertContext&&!0===t.alertContext.htmlBody}),this),this.selectedAlertBody=t.pureComputed((function(){var t=this.selectedAlert();return!t||this.selectedAlertHasHtmlBody()?"":t.alertContext.body}),this),this.selectedAlertHtmlBody=t.pureComputed((function(){var t=this.selectedAlert();return t&&this.selectedAlertHasHtmlBody()?t.alertContext.bodySanitized:""}),this),this.selectedAlertHasAttachments=t.pureComputed((function(){var t=this.selectedAlert();return t&&s.isArray(t.attachments)&&t.attachments.length>0}),this),this.selectedAlertAttachments=t.pureComputed((function(){var t=this.selectedAlert();return t&&this.selectedAlertHasAttachments?t.attachments:[]}),this),this.notificationsService=a.getNotificationsService(),this.handleAlertSelection=function(){i._showAlertHtmlBody(),document.getElementById(i.alertDetailsDivId).scrollTop=0},this.handleHtmlFrameLoaded=function(){if(i.selectedAlertHasHtmlBody()){var t=document.getElementById(i.htmlFrameId);t.height=t.contentWindow.document.documentElement.scrollHeight}},this.getAttachmentSelectHandler=function(t){return function(){i._handleAttachmentSelected(t)}}}return u.prototype._handleBeforeOpen=function(){this.alertsData.removeAll(),this.selectedAlertId(void 0),this._loadAlerts()},u.prototype._closeDialog=function(){document.getElementById(this.popupId).close()},u.prototype._loadAlerts=function(){var t=this;l.startProcessingIndicator(),this.notificationsService.getAlerts(this.notificationId()).then((function(e){t._handleAlertsLoadSuccess(e)}),(function(e){t._handleDataLoadFailure(e)}))},u.prototype._handleAlertsLoadSuccess=function(t){var e=this;l.stopProcessingIndicator();var o=[];s.isArray(t)&&t.length>0&&(o=t.map((function(t){var o={id:t.id,alertContext:JSON.parse(t.alertContext),notificationId:t.notificationId,attachments:t.attachments};return!0===o.alertContext.htmlBody&&(o.alertContext.bodySanitized=e._sanitizeHtml(o.alertContext.body)),o}))),this.alertsData(o),this._selectFirstAlert(),document.getElementById(this.tabbarId).refresh()},u.prototype._sanitizeHtml=function(t){var e=o.sanitize(t,{WHOLE_DOCUMENT:!0});return 0===t.trim().indexOf("<!DOCTYPE")&&-1===e.trim().indexOf("<!DOCTYPE")&&(e="<!DOCTYPE html>"+e),e},u.prototype._selectFirstAlert=function(){var t=this.alertsData()[0],e=t?t.id:null;this.selectedAlertId(e)},u.prototype._showAlertHtmlBody=function(){if(this.selectedAlertHasHtmlBody()){var t=document.getElementById(this.htmlFrameId),e=t.contentWindow.document;t.height="0px",e.open(),e.write(this.selectedAlertHtmlBody()),e.close()}},u.prototype._handleAttachmentSelected=function(t){var e=this,o=this.selectedAlertId();this.notificationsService.getAlertAttachment(o,t).then((function(o){e._performDownload(t,o)}),(function(t){e._handleDataLoadFailure(t)}))},u.prototype._performDownload=function(t,e){var o=document.createElement("a");o.href=window.URL.createObjectURL(e),o.download=t,o.style="display:none;",document.body.appendChild(o),o.click(),document.body.removeChild(o)},u.prototype._handleDataLoadFailure=function(t){i.warn("AlertsPopup._handleDataLoadFailure: failed loading alerts data with reason "+t),l.stopProcessingIndicator()},u}));