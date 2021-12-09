define(["knockout","jquery","ojs/ojcore","ojs/ojlogger","ojs/ojvalidation-base","ojs/ojmodel","jraf/models/components/MultipleSortDataSource","jraf/composites/utils/TranslationLoaderUtil","module","jqueryui-amd/keycode","ojs/ojdatagrid","ojs/ojcollectiondatagriddatasource","ojs/ojpagingdatagriddatasource","ojs/ojvalidation-datetime","ojs/ojvalidation-number","ojs/ojinputtext","ojs/ojselectsingle"],(function(t,e,i,r,o,n,a,l,s){"use strict";function u(t){var e=this;this._context=t,this._initializeProperties(this._context.properties),u._translationLoader.getTranslations().then((function(t){e._updateTranslations(t)}))}return u.DATA_TYPE_STRING="string",u.DATA_TYPE_ICON="icon",u.DATA_TYPE_DATE="date",u.DATA_TYPE_NUMBER="number",u.DATA_TYPE_CUSTOM="custom",u.RTL_SCROLL_TYPE_RIGHT_POSITIVE="origin-right-positive",u.RTL_SCROLL_TYPE_RIGHT_NEGATIVE="origin-right-negative",u.RTL_SCROLL_TYPE_LEFT="origin-left",u.DATE_FORMAT_OPTIONS={formatType:"datetime",dateFormat:"short",timeFormat:"medium"},u.CELL_ICON_CLASS="oj-rgbu-jraf-simple-grid-cell-icon",u.DEFAULT_ROW_HEADER_CLASS="oj-rgbu-jraf-simple-grid-row-header",u._translationLoader=new l("oj-rgbu-jraf-simple-grid",s.id),u.prototype._isNonemptyString=function(t){return"string"==typeof t&&t.length>0},u.prototype._isObjectStrict=function(t){return t&&"object"==typeof t&&!Array.isArray(t)},u.prototype._isFunction=function(t){return"function"==typeof t},u.prototype._isEnterKey=function(t){if(!this._isObjectStrict(t))return!1;var i=t.key||t.keyIdentifier;return i?"Enter"===i:t.keyCode===e.ui.keyCode.ENTER},u.prototype._parseStyle=function(t){if(!this._isNonemptyString(t))return{};var e={};return t.split(";").forEach((function(t){if(this._isNonemptyString(t)){var i=t.split(":");2===i.length&&(e[i[0].trim()]=i[1].trim())}}),this),e},u.prototype._initializeProperties=function(e){var i=this;this.dataGridId=this._context.uniqueId+"_dataGrid",this.filterBarId=this._context.uniqueId+"_filterBar",this.filterPlaceholder=t.observable(e.translations&&e.translations.filterPlaceholder),this.msgNoData=e.translations&&e.translations.msgNoData,this.msgNoFilteredData=e.translations&&e.translations.msgNoFilteredData,this.messageNoData=t.observable(null),this._dateFormatter=o.Validation.converterFactory("datetime").createConverter(u.DATE_FORMAT_OPTIONS),this.gridLabel=t.observable(e.label);var r="oj-rgbu-jraf-simple-grid-data-grid";this._isNonemptyString(e.tableClassNames)&&(r+=" "+e.tableClassNames),this.gridClassNames=t.observable(r),this.gridStyle=t.observable(this._parseStyle(e.tableStyle)),this._disableSorting=e.disableSorting,this._dataCollection=e.collection,this._rowHeaderClassNameFunction=e.rowHeaderClassNameFunction,this._rowHeaderStyleFunction=e.rowHeaderStyleFunction,this._initializeColumnsData(e.columns),this._initializeDataSource(e),this._dataCollection.on(n.Events.EventType.ALLADDED,this._refreshUI.bind(this)),this.rowHeaderConfigured="string"==typeof e.rowHeader,this.showFilterBarRowHeader=t.observable(!this._dataCollection.isEmpty()),this._dataCollection.on(n.Events.EventType.SYNC,this._refreshFilterBar.bind(this)),this.selection=t.observableArray([]),Array.isArray(e.selection)&&this.selection(e.selection),this.selection.subscribe((function(t){e.selection=t.slice(),i._selectChange(t)})),this.selectMode=e.multipleSelect?"multiple":"single",this.selectionListener=this._isFunction(e.selectionListener)?e.selectionListener:null,this._initializeCallbackFunctions(),this._initializeRowHeader(),this._detectRightToLeft()},u.prototype._initializeColumnsData=function(e){this.columns=t.observableArray(),this._columnNames=t.pureComputed((function(){return this.columns().map((function(t){return t.value}))}),this),this._columnHeaders=t.pureComputed((function(){var t={};return this.columns().forEach((function(e){t[e.value]=e.label})),t}),this),this._updateColumnsData(e)},u.prototype._updateColumnsData=function(t){var e=t.filter((function(t){return"boolean"!=typeof t.shown||t.shown}),this).map((function(t){return this._parseColumnSetting(t)}),this);this.columns(e)},u.prototype._parseColumnSetting=function(e){var i;e.dataType===u.DATA_TYPE_NUMBER&&(i=o.Validation.converterFactory("number").createConverter(e.numberConverterOptions));var r={value:e.valueName,label:e.label||e.valueName,typeInfo:e.dataType||u.DATA_TYPE_STRING,callback:e.callback,width:e.width,cellAlignment:e.cellAlignment,headerClassNameFunction:e.headerClassNameFunction,headerStyleFunction:e.headerStyleFunction,cellClassNameFunction:e.cellClassNameFunction,cellStyleFunction:e.cellStyleFunction,customRenderer:e.customRenderer,numberConverter:i,filterEnabled:e.filterEnabled,filterWidth:t.observable(e.width),sortable:!this._disableSorting&&e.sortable};if(e.filterEnabled){var n=t.isWritableObservable(e.filterValue)?e.filterValue:t.observable(t.unwrap(e.filterValue));r.filterOptions=e.filterOptions,r.filterValue=n}return r},u.prototype._initializeDataSource=function(t){var e={columns:this._columnNames(),rowHeader:t.rowHeader};this.dataSource=new a(this._dataCollection,e),t.paging&&(this._isPaging=!0,this.dataSource=new i.PagingDataGridDataSource(this.dataSource)),this._raiseDataSourceInitialized()},u.prototype._raiseDataSourceInitialized=function(){this._raiseCustomEvent("ojRgbuJrafSimpleGridDataSourceInitialized",!1)},u.prototype._raiseCustomEvent=function(t,e){var i={bubbles:!0,cancelable:e};return this._context.element.dispatchEvent(new CustomEvent(t,i))},u.prototype._updateTranslations=function(t){this.filterPlaceholder(this.filterPlaceholder()||t.filterPlaceholder),this.msgNoData=this.msgNoData||t.msgNoData,this.msgNoFilteredData=this.msgNoFilteredData||t.msgNoFilteredData,this._updateNoDataMessage()},u.prototype._updateNoDataMessage=function(){this.messageNoData(this._hasAppliedFilters()?this.msgNoFilteredData:this.msgNoData)},u.prototype._initializeCallbackFunctions=function(){var t=this;this.prepareColumn=function(e){return t._getColumnHeaderLabel(e.data)},this.getSortableValue=function(e){return t._getSortableValue(e)},this.getColumnHeaderClass=function(e){return t._getColumnHeaderClass(e)},this.getColumnHeaderStyle=function(e){return t._getColumnHeaderStyle(e)},this.getRowHeaderClass=function(e){return t._getRowHeaderClass(e)},this.getRowHeaderStyle=function(e){return t._getRowHeaderStyle(e)},this.prepareCell=function(e){return t._prepareCell(e)},this.getCellClass=function(e){return t._getCellClass(e)},this.getCellStyle=function(e){return t._getCellStyle(e)},this.handleFilterChanged=function(){return t._applyCurrentFilters()},this.handleGridScroll=function(e){t._handleGridScroll(e)},this.handleFilterBarScroll=function(){t._syncDataGridScroll()},this.handleColumnResize=function(e){t._handleColumnResize(e)}},u.prototype._initializeRowHeader=function(){if(this.filterBarRowHeaderStyle={maxWidth:"0px"},this.rowHeaderConfigured){var t=this._calculateRowHeaderWidth();this.filterBarRowHeaderStyle={minWidth:t+"px"}}},u.prototype._calculateRowHeaderWidth=function(){var t=document.createElement("div");t.style.visibilty="hidden",t.className=this._getRowHeaderClass();var e=this._parseStyle(this._getRowHeaderStyle());Object.getOwnPropertyNames(e).forEach((function(i){t.style[i]=e[i]})),this._context.element.appendChild(t);var i=t.getBoundingClientRect(),r=Math.round(i.width);return this._context.element.removeChild(t),r},u.prototype._detectRightToLeft=function(){this._isRightToLeft=this._isRTL(),this._isRightToLeft?this._rtlScrollType=this._detectRTLScrollType():this._rtlScrollType=void 0},u.prototype._isRTL=function(){return e("html[dir=rtl]").length>0},u.prototype._detectRTLScrollType=function(){var t=e('<div dir="rtl" style="font-size: 12px; width: 5px; height: 10px; position: absolute; top: -5000px; overflow: scroll">XXXX</div>').appendTo("body")[0],i=u.RTL_SCROLL_TYPE_RIGHT_POSITIVE;return t.scrollLeft>0?i=u.RTL_SCROLL_TYPE_LEFT:(t.scrollLeft=1,0===t.scrollLeft&&(i=u.RTL_SCROLL_TYPE_RIGHT_NEGATIVE)),e(t).remove(),i},u.prototype._getColumnData=function(t){var e="number"==typeof t.index?t.index:t.indexes.column;return this.columns()[e]},u.prototype._getSortableValue=function(t){var e=this._getColumnData(t);return"boolean"==typeof e.sortable?e.sortable?"enable":"disable":"auto"},u.prototype._refreshUI=function(){document.getElementById(this.dataGridId).refresh(),this._detectRightToLeft()},u.prototype._refreshFilterBar=function(){this.showFilterBarRowHeader(!this._dataCollection.isEmpty())},u.prototype._selectChange=function(t){this.selectionListener&&this.selectionListener(t)},u.prototype._getColumnHeaderLabel=function(t){return{insert:this._columnHeaders()[t]}},u.prototype._prepareCell=function(t){var i=this._getColumnData(t),r=i.callback,n=i.typeInfo;if(r){var a=this,l=e(t.parentElement);l.click((function(e){r(e,t)})),l.on("keydown",(function(e){a._isEnterKey(e)&&r(e,t)}))}return n===u.DATA_TYPE_ICON?{insert:this._getCellIconElement(t.data)}:n===u.DATA_TYPE_DATE&&t.data?{insert:this._dateFormatter.format(o.IntlConverterUtils.dateToLocalIso(t.data))}:n===u.DATA_TYPE_NUMBER&&t.data?{insert:i.numberConverter.format(t.data)}:n===u.DATA_TYPE_CUSTOM&&"function"==typeof i.customRenderer?{insert:i.customRenderer(t)}:null!==t.data&&void 0!==t.data?{insert:""+t.data}:void 0},u.prototype._getCellIconElement=function(t){if(!this._isObjectStrict(t)||!this._isNonemptyString(t.icon)||!this._isNonemptyString(t.label))return r.warn("oj-rgbu-jraf-simple-grid: icon columns must be configured with an object specifying the icon and its label."),"";var e=document.createElement("span");return e.classList.add(u.CELL_ICON_CLASS),e.classList.add(t.icon),e.title=t.label,e.setAttribute("aria-label",t.label),e.setAttribute("role","img"),e},u.prototype._getCellClass=function(t){var e=this._getColumnData(t),i=this._getCellAlignmentClass(e);return this._isFunction(e.cellClassNameFunction)&&(i+=" "+e.cellClassNameFunction(t)),i},u.prototype._getCellStyle=function(t){var e=this._getColumnData(t),i="";return this._isFunction(e.cellStyleFunction)&&(i=e.cellStyleFunction(t)),i},u.prototype._getColumnHeaderClass=function(t){var e=this._getColumnData(t),i=this._getCellAlignmentClass(e);return this._isFunction(e.headerClassNameFunction)&&(i+=" "+e.headerClassNameFunction(t)),i},u.prototype._getColumnHeaderStyle=function(t){var e=this._getColumnData(t),i="";return this._isNonemptyString(e.width)&&(i+="width:"+e.width+";"),this._isFunction(e.headerStyleFunction)&&(i+=e.headerStyleFunction(t)),i},u.prototype._getRowHeaderClass=function(t){var e=u.DEFAULT_ROW_HEADER_CLASS;return this._isFunction(this._rowHeaderClassNameFunction)&&(e=this._rowHeaderClassNameFunction(t)),e},u.prototype._getRowHeaderStyle=function(t){var e="";return this._isFunction(this._rowHeaderStyleFunction)&&(e+=this._rowHeaderStyleFunction(t)),e},u.prototype._getCellAlignmentClass=function(t){if(t.typeInfo===u.DATA_TYPE_ICON||t.typeInfo===u.DATA_TYPE_DATE)return"oj-helper-justify-content-center";var e=t.cellAlignment;return"start"===e||"left"===e?"oj-helper-justify-content-flex-start":"end"===e||"right"===e?"oj-helper-justify-content-flex-end":"center"===e?"oj-helper-justify-content-center":"oj-helper-justify-content-flex-end"},u.prototype._applyCurrentFilters=function(){var t=this;this._dataCollection.filterCriteria=this._buildFilterCriteria(),this._dataCollection.refresh(),this._updateNoDataMessage(),window.setTimeout((function(){t._syncDataGridScroll()}),0)},u.prototype._buildFilterCriteria=function(){var e=this.columns().filter((function(e){return t.unwrap(e.filterValue)})).map((function(e){return{column:e.value,value:t.unwrap(e.filterValue)}}));return{filterMethod:this._context.properties.filterMethod,filters:e}},u.prototype.clearFilters=function(){this._hasAppliedFilters()&&(this.columns().forEach((function(t){t.filterEnabled&&t.filterValue(void 0)})),this._applyCurrentFilters())},u.prototype._hasAppliedFilters=function(){var t=this._dataCollection.filterCriteria;return t&&t.filters.length>0},u.prototype._updateFilterMethod=function(){var t=this._dataCollection.filterCriteria;t&&t.filters.length>1&&this._applyCurrentFilters()},u.prototype._handleGridScroll=function(t){var e=t.detail.scrollX;this._updateFilterBarScrollPosition(e)},u.prototype._syncFilterBarScroll=function(){var t=document.getElementById(this.dataGridId).scrollPosition.x;this._updateFilterBarScrollPosition(t)},u.prototype._updateFilterBarScrollPosition=function(t){var e=document.getElementById(this.filterBarId);if(e){var i=t;this._isRightToLeft&&(this._rtlScrollType===u.RTL_SCROLL_TYPE_LEFT?i=e.scrollWidth-(e.clientWidth+t):this._rtlScrollType===u.RTL_SCROLL_TYPE_RIGHT_NEGATIVE&&(i=-t)),e.scrollLeft!==i&&(e.scrollLeft=i)}},u.prototype._syncDataGridScroll=function(){var t=document.getElementById(this.filterBarId),e=document.getElementById(this.dataGridId);if(e&&t){var i=t.scrollLeft;this._isRightToLeft&&(this._rtlScrollType===u.RTL_SCROLL_TYPE_LEFT?i=t.scrollWidth-(t.scrollLeft+t.clientWidth):this._rtlScrollType===u.RTL_SCROLL_TYPE_RIGHT_NEGATIVE&&(i=-t.scrollLeft)),e.scrollPosition.x!==i&&(e.scrollPosition={x:i})}},u.prototype._handleColumnResize=function(t){for(var e=t.detail.header,i=t.detail.newDimensions.width+"px",r=this.columns(),o=0;o<r.length;o++)if(r[o].value===e){r[o].filterWidth(i),r[o].width=i;break}},u.prototype.propertyChanged=function(t){var e=t.property;"external"===t.updatedFrom&&("selection"===e?this.selection(t.value):"filteringEnabled"===e?(this.clearFilters(),this._syncFilterBarScroll()):"filterMethod"===e&&this._updateFilterMethod())},u.prototype.getDataSource=function(){return this.dataSource},u.prototype.getContextByNode=function(t){return document.getElementById(this.dataGridId).getContextByNode(t)},u.prototype.refresh=function(){return this._isPaging&&this._dataCollection.refresh(),this._refreshUI()},u.prototype.reset=function(){this._updateColumnsData(this._context.properties.columns),this._initializeDataSource(this._context.properties),document.getElementById(this.dataGridId).setProperty("data",this.dataSource)},u.prototype.resetColumnHeaders=function(){var t=this._context.properties.columns.reduce((function(t,e){return t[e.valueName]=e.label||e.valueName,t}),{}),e=this.columns().map((function(e){var i=t[e.value];return i&&(e.label=i),e}));this.columns(e),document.getElementById(this.dataGridId).refresh()},u}));