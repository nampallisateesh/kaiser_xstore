define(["ojs/ojcore","jraf/utils/ValidationUtils","ojs/ojcollectiondatagriddatasource"],(function(t,o){"use strict";function r(t){r.superclass.constructor.apply(this,arguments),this.collection=this.collection||t,this._findSortVar()}return t.Object.createSubclass(r,t.CollectionDataGridDataSource,"MultipleSortDataSource"),r.prototype._findSortVar=function(){var t=Object.keys(this);for(var r in t){var i=t[r],s=this[i];o.isObjectStrict(s)&&s.hasOwnProperty("axis")&&s.hasOwnProperty("direction")&&s.hasOwnProperty("key")&&(this._sortVar=i)}},r.prototype.sort=function(t,o,i){i=i||{},null!==t?"column"===t.axis?(this.collection.sortCriteria=[{column:t.key,direction:"ascending"===t.direction?"asc":"desc"}],this.collection.comparator=t.key,this.collection.sortDirection="ascending"===t.direction?1:-1,this.collection.sort(),this._overrideSortInfo(t.key),o&&o.success&&o.success.call(i.success)):o&&o.error&&o.error.call(i.error,"Invalid axis value"):r.superclass.sort.call(this,t,o,i)},r.prototype._overrideSortInfo=function(t){var r,i;r=this.collection.comparator,i=-1===this.collection.sortDirection?"descending":"ascending";var s={};null===t&&o.isFunction(r)||(s.axis="column",s.direction=i,s.key=null===t?r:null),this._sortVar||this._findSortVar(),this._sortVar&&(this[this._sortVar]=s)},r}));