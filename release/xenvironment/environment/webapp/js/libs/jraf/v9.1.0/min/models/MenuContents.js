define(["jraf/jrafcore","jraf/models/UIShellManager","jraf/models/Content"],(function(t,e,n){"use strict";var r=null,i=null;function u(){this.Mu={},this.Uu={},this.contentLeaves={}}return u.prototype.registerMenuOptions=function(t,r){var i=this,u=r();return e.registerDataPromise(t,u),this.Mu[t]=u.then((function(e){var r=e instanceof n?e:new n(e);i.Uu[t]=i.$e(r,{})})),u},u.prototype.$e=function(t,e){var n=t.getId();if((e[n]=t).isFolder())for(var r=t.getChildren(),i=0;i<r.length;i++){var u=r[i];this.$e(u,e)}else t.isLaunchable()&&(this.contentLeaves[n]=t);return e},u.prototype.getMenuContent=function(t){var e=this;return this.Mu[t].then((function(){return e.Uu[t]}))},u.prototype.getContentLeaves=function(){var t=this,e=[];for(var n in this.Mu)e.push(this.Mu[n]);return Promise.all(e).then((function(){return t.contentLeaves}))},u.getInstance=function(){var e=t.App.getUserData().userid;return null!==r&&i===e||(r=new u,i=e),r},u}));