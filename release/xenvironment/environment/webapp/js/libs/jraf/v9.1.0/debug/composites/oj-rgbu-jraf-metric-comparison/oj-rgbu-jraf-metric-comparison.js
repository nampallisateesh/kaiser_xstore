define(["knockout","ojs/ojlogger","jraf/composites/utils/TranslationLoaderUtil","module"],(function(r,o,a,i){"use strict";function e(r){var a=this;this._loadingTranslations=e._translationLoader.getTranslations(),this._initializeProperties(r),this._componentInitializing=this._loadingTranslations.then((function(r){a._initializeTranslations(r),o.info("oj-rgbu-jraf-metric-comparison: component initialized.")}))}return e._translationLoader=new a("oj-rgbu-jraf-metric-comparison",i.id),e.INDICATOR_TYPE_NO_SEVERITY="none",e.INDICATOR_TYPE_NORMAL="low",e.INDICATOR_TYPE_IMPORTANT="medium",e.INDICATOR_TYPE_CRITICAL="high",e.INDICATOR_TYPE_ADMIN="admin",e.INDICATOR_TYPE_DISABLED="disabled",e.INDICATOR_DIRECTION_UP="up",e.INDICATOR_DIRECTION_DOWN="down",e.MAXIMUM_METRIC_COUNT=2,e.TRANSLATIONS_PROPERTY_MAP={"upArrow.disabled":"upArrowDisabledLabel","upArrow.noseverity":"upArrowNoSeverityLabel","upArrow.normal":"upArrowNormalLabel","upArrow.important":"upArrowImportantLabel","upArrow.critical":"upArrowCriticalLabel","upArrow.admin":"upArrowAdminLabel","downArrow.disabled":"downArrowDisabledLabel","downArrow.noseverity":"downArrowNoseverityLabel","downArrow.normal":"downArrowNormalLabel","downArrow.important":"downArrowImportantLabel","downArrow.critical":"downArrowCriticalLabel","downArrow.admin":"downArrowAdminLabel"},e.prototype.activated=function(){return this._componentInitializing},e.prototype._initializeProperties=function(o){this.upArrowDisabledLabel=r.observable(),this.upArrowNoSeverityLabel=r.observable(),this.upArrowNormalLabel=r.observable(),this.upArrowImportantLabel=r.observable(),this.upArrowCriticalLabel=r.observable(),this.upArrowAdminLabel=r.observable(),this.downArrowDisabledLabel=r.observable(),this.downArrowNoseverityLabel=r.observable(),this.downArrowNormalLabel=r.observable(),this.downArrowImportantLabel=r.observable(),this.downArrowCriticalLabel=r.observable(),this.downArrowAdminLabel=r.observable();var a=o.properties,i=r.unwrap(a.metricData);this.singleMetric=1===i.length;var t=i.length>=e.MAXIMUM_METRIC_COUNT;this.metricData=[];for(var n=t?e.MAXIMUM_METRIC_COUNT:i.length,l=0;l<n;l++){var s=i[l],A=this._getIndicatorIconData(s);this.metricData.push({name:s.name,value:s.value,indicatorIcon:A.icon,indicatorLabel:A.label})}},e.prototype._initializeTranslations=function(r){this.upArrowDisabledLabel(r.upArrow.disabled),this.upArrowNoSeverityLabel(r.upArrow.noseverity),this.upArrowNormalLabel(r.upArrow.normal),this.upArrowImportantLabel(r.upArrow.important),this.upArrowCriticalLabel(r.upArrow.critical),this.upArrowAdminLabel(r.upArrow.admin),this.downArrowDisabledLabel(r.downArrow.disabled),this.downArrowNoseverityLabel(r.downArrow.noseverity),this.downArrowNormalLabel(r.downArrow.normal),this.downArrowImportantLabel(r.downArrow.important),this.downArrowCriticalLabel(r.downArrow.critical),this.downArrowAdminLabel(r.downArrow.admin)},e.prototype._getIndicatorIconData=function(o){var a=r.unwrap(o.indicatorIcon),i=r.unwrap(o.indicatorLabel);if(a)return{icon:a,label:i};var t,n=r.unwrap(o.indicatorDirection);if(n!==e.INDICATOR_DIRECTION_UP&&n!==e.INDICATOR_DIRECTION_DOWN)return{};switch(r.unwrap(o.indicatorType)){case e.INDICATOR_TYPE_ADMIN:t="admin";break;case e.INDICATOR_TYPE_CRITICAL:t="critical";break;case e.INDICATOR_TYPE_IMPORTANT:t="important";break;case e.INDICATOR_TYPE_NORMAL:t="normal";break;case e.INDICATOR_TYPE_NO_SEVERITY:t="noseverity";break;case e.INDICATOR_TYPE_DISABLED:t="disabled"}return t?{icon:this._getIndicatorIconClass(n,t),label:this._getIndicatorIconLabel(n,t)}:{}},e.prototype._getIndicatorIconClass=function(r,o){return"oj-rgbu-jraf-metric-comparison-"+o+"-arrow-"+r},e.prototype._getIndicatorIconLabel=function(r,o){var a=r===e.INDICATOR_DIRECTION_UP?"upArrow":"downArrow";return this[e.TRANSLATIONS_PROPERTY_MAP[a+"."+o]]},e}));