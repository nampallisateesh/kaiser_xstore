define(["jraf/utils/ValidationUtils","jraf/models/NavigationHelper","jraf/models/NavigationMenuItem","jraf/models/Content","jraf/services/ServiceManager","jraf/jrafcore"],(function(e,t,i,a,n,o){"use strict";function r(t){if(!e.isObjectStrict(t))throw new TypeError("NavigationConfig: Missing required navigation config.");var i=e.isBoolean(t.renderNavigation);this.renderNavigation=i?t.renderNavigation:!e.isBoolean(t.renderSidebarArea)||t.renderSidebarArea,this.renderNavigation&&this.Tu(t)}return r.APP_NAVIGATOR_ID="app-navigator",r.FAVORITES_ID="favorites",r.TASKS_ID="tasks",r.NOTIFICATIONS_ID="notifications",r.QUICK_CREATE_ID="quick-create",r.QUICK_LOOKUP_ID="quick-lookup",r.REPORTS_ID="reports",r.SETTINGS_ID="settings",r.TASKS_FAVORITE_TYPE="task",r.REPORTS_FAVORITE_TYPE="report",r.SETTINGS_FAVORITE_TYPE="task",r.MAX_MENU_ITEMS=8,r.DEFAULT_POLLING_INTERVAL=3e4,r.SIDEBAR_LAYOUT="sidebar",r.HORIZONTAL_LAYOUT="horizontal",r.prototype.Tu=function(t){this.exposeLayoutConfiguration=e.getBoolean(t.exposeLayoutConfiguration,!1);var i=r.isValidLayout(t.defaultNavigationLayout);this.defaultNavigationLayout=i?t.defaultNavigationLayout:r.SIDEBAR_LAYOUT,this.sl=t.pollingInterval||r.DEFAULT_POLLING_INTERVAL,this.menuItems=[],this.Lu=!e.getBoolean(t.hideNotifications,!1),this.Eu=e.getBoolean(t.renderNotificationReassignment,!0),this.Nu=t.beforeOpenContentHandler,this.ul=t.beforeLoadModuleHandler,this.fl=t.afterUnloadModuleHandler,this.Bu(t),this.zu(t),this.Ru(t),this.xu(t),this.Au(t),this.Hu(t),this.Du(t),this.Vu(t),this.Qu(t),this._u(t)},r.isValidLayout=function(e){return 0<=[r.SIDEBAR_LAYOUT,r.HORIZONTAL_LAYOUT].indexOf(e)},r.prototype.Gu=function(e){this.menuItems.push(e)},r.prototype.Bu=function(t){e.getBoolean(t.hideAppNavigator,!1)||this.Ju(t)},r.prototype.Ju=function(e){var t={name:"jraf/appnavigator/SidebarNavigator",params:{launchApplicationCallback:e.launchApplicationCallback}},a={name:"jraf/appnavigator/NavigatorMenuBody",params:{launchApplicationCallback:e.launchApplicationCallback,layout:"horizontal"}};this.Gu(new i({id:r.APP_NAVIGATOR_ID,icon:"jraf-app-navigator-icon",selectedIcon:"jraf-app-navigator-selected-icon",iconLabel:"jraf.sidebar.appNavigator",badgingEnabled:!1,sidebarMenuModuleBinding:t,horizontalMenuModuleBinding:a}))},r.prototype.zu=function(t){this.hideFavorites=e.getBoolean(t.hideFavorites,!1),this.hidePinnedFavorites=e.getBoolean(t.hidePinnedFavorites,!1),this.hideFavorites||(this.re=e.getBoolean(t.displayFavoriteTitleInTab,!1),this.Ku(t))},r.prototype.Ku=function(e){var t={name:"jraf/UIShellFavoritesMenu",params:{hidePinnedFavorites:this.hidePinnedFavorites}},a={name:"jraf/favorites/HorizontalFavoritesMenu",params:{hidePinnedFavorites:this.hidePinnedFavorites}};this.Gu(new i({id:r.FAVORITES_ID,icon:"jraf-favorites-icon",selectedIcon:"jraf-favorites-selected-icon",iconLabel:"jraf.sidebar.favorites.title",badgingEnabled:!1,sidebarMenuModuleBinding:t,horizontalMenuModuleBinding:a}))},r.prototype.Ru=function(t){if(!e.getBoolean(t.hideTasks,!1)){if(!this.Ou("getTasks",t.getTasksCallback))throw new TypeError("NavigationConfig: Invalid configuration. Must register TasksService or provide getTasksCallback if hideTasks is false (default).");this.Wu(t)}},r.prototype.Ou=function(t,i){return this.Xu(t)||e.isFunction(i)},r.prototype.Xu=function(t){var i=n.getTasksService();return i&&e.isFunction(i[t])},r.prototype.Yu=function(e,t){return this.Xu(e)?function(){return n.getTasksService()[e]()}:t},r.prototype.Zu=function(e){return this.Yu("getTasks",e.getTasksCallback)},r.prototype.$u=function(e){return this.Yu("getReports",e.getReportsCallback)},r.prototype.ec=function(e){return this.Yu("getSettings",e.getSettingsCallback)},r.prototype.Wu=function(e){var t=this.Zu(e),a="string"==typeof e.tasksMenuHeader&&0<e.tasksMenuHeader.length?e.tasksMenuHeader:"jraf.sidebar.tasks",n={name:"jraf/UIShellTasksMenu",params:{header:a,navListLabel:"jraf.sidebar.tasksListDescription",searchPlaceholderText:"jraf.sidebar.taskSearchPlaceholder",autosuggestAdditionalResultsText:"jraf.sidebar.additionalTasks",getTasks:t,taskId:o.UIShell.TASKS_DATA_LOAD_ID,favoritesEnabled:!this.hideFavorites,favoritesType:r.TASKS_FAVORITE_TYPE}},s={name:"jraf/tasks/HorizontalTasksMenu",params:{navListLabel:"jraf.sidebar.tasksListDescription",getTasks:t,taskId:o.UIShell.TASKS_DATA_LOAD_ID,favoritesEnabled:!this.hideFavorites,favoritesType:r.TASKS_FAVORITE_TYPE}};this.Gu(new i({id:r.TASKS_ID,icon:"jraf-tasks-icon",selectedIcon:"jraf-tasks-selected-icon",iconLabel:a,badgingEnabled:!1,sidebarMenuModuleBinding:n,horizontalMenuModuleBinding:s}))},r.prototype.xu=function(e){this.hasNotificationsEnabled()&&this.nc(e)},r.prototype.nc=function(e){var t=n.getNotificationsService();if(!t)throw new Error("NavigationConfig._addNotificationsMenuItem: A notifications service is required by the Notifications UI.");var a=new i({id:r.NOTIFICATIONS_ID,icon:"jraf-notifications-icon",selectedIcon:"jraf-notifications-selected-icon",iconLabel:"jraf.sidebar.notifications.title",badgingEnabled:!0,badgeValue:function(){return t.getUnreadNotificationCount()},sidebarMenuModuleBinding:{name:"jraf/UIShellNotificationsMenu",params:{}},horizontalMenuModuleBinding:{name:"jraf/notifications/HorizontalNotificationsMenu",params:{}}});this.Gu(a);var o=a.getBadgeValue();a.getSidebarMenuModuleBinding().params.badgeValue=o,a.getHorizontalMenuModuleBinding().params.badgeValue=o},r.prototype.Hu=function(t){e.getBoolean(t.hideQuickCreate,!0)||this.ac(t)},r.prototype.ac=function(e){var t={viewName:"jraf/UIShellQuickCreateMenu"};this.Gu(new i({id:r.QUICK_CREATE_ID,icon:"jraf-quick-create-icon",selectedIcon:"jraf-quick-create-selected-icon",iconLabel:"jraf.sidebar.quickCreate",badgingEnabled:!1,sidebarMenuModuleBinding:t,horizontalMenuModuleBinding:t}))},r.prototype.Du=function(t){e.getBoolean(t.hideQuickLookup,!0)||this.rc(t)},r.prototype.rc=function(e){var t={viewName:"jraf/UIShellQuickLookupMenu"};this.Gu(new i({id:r.QUICK_LOOKUP_ID,icon:"jraf-quick-lookup-icon",selectedIcon:"jraf-quick-lookup-selected-icon",iconLabel:"jraf.sidebar.quickLookup",badgingEnabled:!1,sidebarMenuModuleBinding:t,horizontalMenuModuleBinding:t}))},r.prototype.Au=function(t){if(!e.getBoolean(t.hideReports,!0)){if(!this.Ou("getReports",t.getReportsCallback))throw new TypeError("NavigationConfig: Invalid configuration. Must register TasksService or provide getReportsCallback if hideReports is false.");this.oc(t)}},r.prototype.oc=function(e){var t=this.$u(e),a="jraf.sidebar.reports",n={name:"jraf/UIShellTasksMenu",params:{header:a,navListLabel:"jraf.sidebar.reportsListDescription",searchPlaceholderText:"jraf.sidebar.reportSearchPlaceholder",autosuggestAdditionalResultsText:"jraf.sidebar.additionalReports",getTasks:t,taskId:o.UIShell.REPORTS_DATA_LOAD_ID,favoritesEnabled:!this.hideFavorites,favoritesType:r.REPORTS_FAVORITE_TYPE}},s={name:"jraf/tasks/HorizontalTasksMenu",params:{navListLabel:"jraf.sidebar.reportsListDescription",getTasks:t,taskId:o.UIShell.REPORTS_DATA_LOAD_ID,favoritesEnabled:!this.hideFavorites,favoritesType:r.REPORTS_FAVORITE_TYPE}};this.Gu(new i({id:r.REPORTS_ID,icon:"jraf-reports-icon",selectedIcon:"jraf-reports-selected-icon",iconLabel:a,badgingEnabled:!1,sidebarMenuModuleBinding:n,horizontalMenuModuleBinding:s}))},r.prototype.Vu=function(t){if(!e.getBoolean(t.hideSettings,!0)){if(!this.Ou("getSettings",t.getSettingsCallback))throw new TypeError("NavigationConfig: Invalid configuration. Must register TasksService or provide getSettingsCallback if hideSettings is false.");this.uc(t)}},r.prototype.uc=function(e){var t=this.ec(e),a="jraf.sidebar.settings",n={name:"jraf/UIShellTasksMenu",params:{header:a,navListLabel:"jraf.sidebar.settingsListDescription",searchPlaceholderText:"jraf.sidebar.settingsSearchPlaceholder",autosuggestAdditionalResultsText:"jraf.sidebar.additionalSettings",getTasks:t,taskId:o.UIShell.SETTINGS_DATA_LOAD_ID,favoritesEnabled:!this.hideFavorites,favoritesType:r.SETTINGS_FAVORITE_TYPE}},s={name:"jraf/tasks/HorizontalTasksMenu",params:{navListLabel:"jraf.sidebar.settingsListDescription",getTasks:t,taskId:o.UIShell.SETTINGS_DATA_LOAD_ID,favoritesEnabled:!this.hideFavorites,favoritesType:r.SETTINGS_FAVORITE_TYPE}};this.Gu(new i({id:r.SETTINGS_ID,icon:"jraf-settings-icon",selectedIcon:"jraf-settings-selected-icon",iconLabel:a,badgingEnabled:!1,sidebarMenuModuleBinding:n,horizontalMenuModuleBinding:s}))},r.prototype.Qu=function(t){var a=e.isArray(t.customMenuItems)?t.customMenuItems:t.customSidebarMenuItems;e.isArray(a)&&a.forEach((function(e,t){if(!(e instanceof i))throw new TypeError("NavigationConfig: customMenuItems index #"+t+" must be a NavigationMenuItem instance.");this.Gu(e)}),this)},r.prototype._u=function(e){this.defaultContentCallbacks={},this.Ou("getTasks",e.getTasksCallback)&&(this.defaultContentCallbacks[o.UIShell.TASKS_DATA_LOAD_ID]=this.Zu(e)),this.Ou("getReports",e.getReportsCallback)&&(this.defaultContentCallbacks[o.UIShell.REPORTS_DATA_LOAD_ID]=this.$u(e)),this.Ou("getSettings",e.getSettingsCallback)&&(this.defaultContentCallbacks[o.UIShell.SETTINGS_DATA_LOAD_ID]=this.ec(e)),this.cc(e)&&(this.defaultContentCallbacks[o.UIShell.LAUNCHABLE_DATA_LOAD_ID]=this.dc(e))},r.prototype.cc=function(t){return e.isFunction(t.getLaunchableContent)||this.hasNotificationsEnabled()},r.prototype.dc=function(t){var i=this;return function(){return(e.isFunction(t.getLaunchableContent)?t.getLaunchableContent():Promise.resolve([])).then((function(e){return i.fc(i.lc(e))}))}},r.prototype.lc=function(t){if(!e.isArray(t))throw new TypeError("NavigationConfig._getAllLaunchableContent: launchableContent must be an array");return t.concat(this.hc()).filter((function(e){return e.resourceType===a.CONTENT_TYPE_MODULE||e.resourceType===a.CONTENT_TYPE_URL}))},r.prototype.fc=function(e){return{id:"jraf.navigation.launchable.merged",title:"Merged Launchable Content",resourceType:a.CONTENT_TYPE_FOLDER,children:e}},r.prototype.hc=function(){var e=[];return this.hasNotificationsEnabled()&&e.push(t.getNotificationsPageContentConfig({})),e},r.prototype.gc=function(){for(var e,t,i,a=this.bc(),n=0;n<a.length;n++){var o=a[n];0===n&&(e=o),o.id===r.FAVORITES_ID?t=o:o.id===r.TASKS_ID&&(i=o)}return t||i||e||null},r.prototype.bc=function(){var e=this.menuItems.length>r.MAX_MENU_ITEMS?r.MAX_MENU_ITEMS:this.menuItems.length;return this.menuItems.slice(0,e)},r.prototype.hasNavigation=function(){return this.renderNavigation},r.prototype.hasFavoritesEnabled=function(){return!this.hideFavorites},r.prototype.isDisplayFavoriteTitleInTab=function(){return this.re},r.prototype.hasPinnedFavoritesEnabled=function(){return!this.hidePinnedFavorites},r.prototype.hasNotificationsEnabled=function(){return this.Lu},r.prototype.isLayoutConfigurable=function(){return this.renderNavigation&&this.exposeLayoutConfiguration},r.prototype.getDefaultNavigationLayout=function(){return this.defaultNavigationLayout},r.prototype.getDefaultMenuItem=function(){return this.gc()},r.prototype.getMenuItems=function(){return this.bc()},r.prototype.getDefaultContentCallbacks=function(){return this.defaultContentCallbacks},r.prototype.getPollingInterval=function(){return this.sl},r.prototype.getRenderNotificationReassignment=function(){return this.Eu},r.prototype.getBeforeOpenContentHandler=function(){return this.Nu},r.prototype.getBeforeLoadModuleHandler=function(){return this.ul},r.prototype.getAfterUnloadModuleHandler=function(){return this.fl},r.buildCustomTasksNavigationMenuItem=function(t){if(!(e.isObjectStrict(t)&&e.isNonemptyString(t.id)&&e.isNonemptyString(t.iconLabel)&&e.isNonemptyString(t.icon)&&e.isNonemptyString(t.selectedIcon)&&e.isFunction(t.getTasks)&&e.isNonemptyString(t.headerLabel)&&e.isNonemptyString(t.navigationAriaLabel)&&e.isNonemptyString(t.searchPlaceholderLabel)&&e.isNonemptyString(t.autosuggestAdditionalResultsText)))throw new TypeError("NavigationConfig.buildCustomTasksNavigationMenuItem:  Missing required properties.");var a={name:"jraf/UIShellTasksMenu",params:{header:t.headerLabel,navListLabel:t.navigationAriaLabel,searchPlaceholderText:t.searchPlaceholderLabel,autosuggestAdditionalResultsText:t.autosuggestAdditionalResultsText,getTasks:t.getTasks,favoritesEnabled:t.favoritesEnabled,favoritesType:t.favoritesType}},n={name:"jraf/tasks/HorizontalTasksMenu",params:{navListLabel:t.navigationAriaLabel,getTasks:t.getTasks,favoritesEnabled:t.favoritesEnabled,favoritesType:t.favoritesType}};return new i({id:t.id,icon:t.icon,selectedIcon:t.selectedIcon,iconLabel:t.iconLabel,badgingEnabled:t.badgingEnabled,badgeValue:t.badgeValue,sidebarMenuModuleBinding:a,horizontalMenuModuleBinding:n})},r}));