var <%= modulevarname %> = angular.module('<%= modulename %>', []);

<%= modulevarname %>.constant('<%= constantsname %>', {
    CONFIG: {
        STATE: '<%= statename %>',
        CONTROLLER: '<%= controllername %>',
        URL: '<%= stateurl %>',
        TEMPLATE_URL: '<%= dir %><%= name %>.html'
    }
});

<%= modulevarname %>.config(['$stateProvider', '<%= constantsname %>',
    function($stateProvider, <%= constantsname %>) {
        $stateProvider.state(<%= constantsname %>.CONFIG.STATE, {
            url: <%= constantsname %>.CONFIG.URL,
            templateUrl: <%= constantsname %>.CONFIG.TEMPLATE_URL,
            controller: <%= constantsname %>.CONFIG.CONTROLLER
        });
    }
]);

<%= modulevarname %>.controller('<%= controllername %>', [
    '<%= servicename %>',
    '<%= constantsname %>',
    function(<%= servicename %>, <%= constantsname %>) {

    }
]);

<%= modulevarname %>.factory('<%= servicename %>', [
    '<%= constantsname %>',
    function(<%= constantsname %>) {
        var factory = {};
        return factory;
    }
]);