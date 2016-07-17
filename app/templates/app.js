<%= appname %> = angular.module('<%= appname %>', [
    '<%= routerModuleName %>'
]);

<%= appname %>.constant('APPLICATIONCONSTANTS', {
    RUN: {},
    CONFIG: {
        DEFAULT_URL: '/home'
    }
});

<%= appname %>.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    /* Add New States Above */
    $urlRouterProvider.otherwise('APPLICATIONCONSTANTS.CONFIG.DEFAULT_URL');
}]);

<%= appname %>.run([function() {

}]);