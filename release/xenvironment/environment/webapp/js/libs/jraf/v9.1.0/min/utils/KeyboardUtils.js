define(["jraf/utils/ValidationUtils","jquery","jqueryui-amd/keycode"],(function(e,i){"use strict";var r={ENTER_KEY:"Enter",SPACEBAR_KEY:" ",isEnterKey:function(e){return r.isKey(e,r.ENTER_KEY,i.ui.keyCode.ENTER)},isSpaceKey:function(e){return r.isKey(e,r.SPACEBAR_KEY,i.ui.keyCode.SPACE)},isKey:function(i,r,t){if(!e.isObjectStrict(i))return!1;var n=i.key||i.keyIdentifier;return n?n===r:i.keyCode===t}};return r}));