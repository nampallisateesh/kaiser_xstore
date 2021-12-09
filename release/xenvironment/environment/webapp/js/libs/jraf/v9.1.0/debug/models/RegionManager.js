define(["jquery","knockout","jraf/models/Content","jraf/models/ModalPageManager","jraf/utils/ValidationUtils"],(function(e,n,t,o,i){"use strict";function a(e){if(!(i.isObjectStrict(e)&&i.isNonemptyString(e.modalPageContainerId)&&n.isObservable(e.activeModuleBinding)&&n.isObservable(e.activeModuleOptions)))throw new TypeError("RegionManager: Missing required parameters");this._modalPageManager=new o({modalPageContainerId:e.modalPageContainerId,beforeLoadModuleHandler:e.beforeLoadModuleHandler,afterUnloadModuleHandler:e.afterUnloadModuleHandler}),this._currentModuleBinding=e.activeModuleBinding,this._currentModuleOptions=e.activeModuleOptions}return a.prototype.openModalPageInContent=function(e,n){this.openContent(n),this._modalPageManager.openContent(e)},a.prototype.openContent=function(n){if(!(n instanceof t))throw new TypeError("RegionManager.openContent: Invalid content passed");this._activeContentId=n.getId();var o=n.hasModuleOptions()?n.getModuleOptions():n.getModuleBinding();o=e.extend(!0,{},o,{params:{jraf:{modalPageManager:this._modalPageManager}}}),n.hasModuleOptions()?this._currentModuleOptions(o):this._currentModuleBinding(o),this._triggerContentChange(n.getTitle())},a.prototype._triggerContentChange=function(n){e(window.document).trigger("jrafcontentchange",[{title:n}])},a.prototype.closeContent=function(e){var n=e.getId();this._activeContentId===n&&(this._currentModuleBinding(null),this._currentModuleOptions(null),this._triggerContentChange(null))},a}));