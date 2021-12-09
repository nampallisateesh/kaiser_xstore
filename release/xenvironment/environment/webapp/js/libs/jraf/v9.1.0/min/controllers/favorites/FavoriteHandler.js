define(["ojs/ojcore","knockout","jraf/services/ServiceManager","jraf/models/Content","jraf/models/UIShellManager","jraf/utils/ValidationUtils","jraf/models/favorites/FavoritesContent"],(function(e,t,n,r,i,o,a){"use strict";function s(e){if(!o.isObjectStrict(e)||!o.isNonemptyString(e.serviceKey))throw new TypeError("FavoriteHandler: Missing required serviceKey property");this.re=o.getBoolean(e.displayFavoriteTitleInTab,!1),this.ae=n.getService(e.serviceKey),o.isFunction(e.openContentHandler)&&(this.fe=e.openContentHandler),o.isFunction(e.getLocalizedTitleHandler)&&(this.ce=e.getLocalizedTitleHandler)}return s.prototype.getFavoritesService=function(){return this.ae},s.prototype.openContent=function(e){if(!o.isNumberStrict(e))throw new TypeError("FavoriteHandler.openContent: A favoriteId is required.");this.fe(e)},s.prototype.fe=function(e){var t=this,n=a.getInstance(this.ae);n.whenReady().then((function(){var r=n.lookupFavoriteById(e);if(r){var o=n.getContent(r.contentId);if(o){var a=t.ve(o,r.favoriteContext);a=t.le(a,e),i.openContent(a)}}}))},s.prototype.ve=function(e,t){if(!t||!o.isObjectStrict(t)||!e.isModule())return e;var n={};return n[e.hasModuleOptions()?"moduleOptions":"moduleBinding"]={params:t},r.extendContent(e,n)},s.prototype.le=function(e,t){if(this.re){var n={targetProperties:{targetTitle:this.getLocalizedTitle(t)()}};return r.extendContent(e,n)}return e},s.prototype.getLocalizedTitle=function(e,t){if(!o.isNumberStrict(e))throw new TypeError("FavoriteHandler.getLocalizedTitle: A favoriteId is required.");return this.ce(e,t)},s.prototype.ce=function(e,n){var r=a.getInstance(this.ae),i=r.lookupFavoriteById(e);return t.pureComputed((function(){if(i){var e=i.contentTitle;return i.customName()&&o.isNonemptyString(i.customName().trim())&&!n?e=i.customName():o.isNonemptyString(i.objectId)||i.isFolder||!o.isNonemptyString(i.contentId)||(e=r.getContent(i.contentId).getTitle()),e}return null}))},s}));