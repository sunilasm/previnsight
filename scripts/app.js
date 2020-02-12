(function () { 


var tracehiveApp = angular.module('tracehiveApp', ['ui.router', 'ngTagsInput', 'ngSanitize', 'widget.scrollbar', 'wxy.pushmenu', 'localytics.directives', 'nya.bootstrap.select', 'froala', 'uiSwitch','uniqueField', 'ngToast', 'tracehive.controller', 'tracehive.services', 'angularModalService', 'ui.bootstrap.datetimepicker', 'simditor','validation.match', '720kb.datepicker', 'ngAnimate', 'angularjs-datetime-picker', 'uniqueField']);


tracehiveApp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'loginCtrl'
        })
        .state('nav', {
            //url: '/user',
            abstract: true,
            templateUrl: 'views/header.html',
            controller: 'navCtrl'
        })
        .state('nav.home', {
            url: '/home',
            templateUrl: 'views/main.html',
            controller: 'mainCtrl'
        })
        .state('nav.sensors', {
            url: '/sensors',
            templateUrl: 'views/sensors.html',
            controller: 'sensorsCtrl'
        })
        .state('nav.machinery', {
            url: '/machinery',
            templateUrl: 'views/machinery.html',
            controller: 'machineryCtrl'
        })
        .state('nav.addSensor', {
            url: '/addSensor',
            templateUrl: 'views/addsensor.html',
            controller: 'addSensorCtrl'
        })
        .state('nav.addMachinery', {
            url: '/addMachinery',
            templateUrl: 'views/addmachinery.html',
            controller: 'addmachineryCtrl'
        })
        .state('nav.parameters', {
            url: '/parameters',
            templateUrl: 'views/parameters.html',
            controller: 'parametersCtrl'
        })
        .state('nav.addParameter', {
            url: '/addParameter',
            templateUrl: 'views/addparameter.html',
            controller: 'addParameterCtrl'
        })
        .state('nav.inventory', {
            url: '/inventory',
            templateUrl: 'views/inventory.html',
            controller: 'invetoryCtrl'
        })
        .state('nav.addInventory', {
            url: '/addInventory',
            templateUrl: 'views/addinvetory.html',
            controller: 'addinvetoryCtrl'
        })
        .state('nav.workorders', {
            url: '/workorders',
            templateUrl: 'views/workorders.html',
            controller: 'workordersCtrl'
        })
        .state('nav.addWorkorder', {
            url: '/addWorkorder',
            templateUrl: 'views/addworkorder.html',
            controller: 'addworkorderCtrl'
        })
        .state('nav.recipes', {
            url: '/recipes',
            templateUrl: 'views/recipes.html',
            controller: 'recipesCtrl'
        })
        .state('nav.addRecipe', {
            url: '/addRecipe',
            templateUrl: 'views/addrecipe.html',
            controller: 'addrecipesCtrl'
        })
        .state('nav.reports', {
            url: '/reports',
            templateUrl: 'views/reports.html',
            controller: 'reportsCtrl'
        })
        .state('nav.notifications', {
            url: '/notifications',
            templateUrl: 'views/notifications.html',
            controller: 'notificationsCtrl'
        })
        .state('nav.addLocation', {
            url: '/addLocation',
            templateUrl: 'views/addlocation.html',
            controller: 'addlocationCtrl'
        })
        .state('nav.mastermaterial', {
            url: '/mastermaterial',
            templateUrl: 'views/mastermaterial.html',
            controller: 'masterMaterialCtrl'
        }).state('nav.masteruom', {
            url: '/masteruom',
            templateUrl: 'views/masteruom.html',
            controller: 'masterUomCtrl'
        }).state('nav.mastermanufature', {
            url: '/mastermanufature',
            templateUrl: 'views/mastermanufature.html',
            controller: 'masterManufatureCtrl'
        }).state('nav.mastermodel', {
            url: '/mastermodel',
            templateUrl: 'views/mastermodel.html',
            controller: 'masterModelCtrl'
        }).state('nav.masterlocation', {
            url: '/masterlocation',
            templateUrl: 'views/masterlocation.html',
            controller: 'masterlocationCtrl'
        }).state('nav.users', {
            url: '/users',
            templateUrl: 'views/users.html',
            controller: 'usersCtrl'
        }).state('nav.adduser', {
            url: '/adduser',
            templateUrl: 'views/adduser.html',
            controller: 'adduserCtrl'
        }).state('nav.machinerylogactivities', {
            url: '/machinerylogactivities',
            templateUrl: 'views/machinerylogactivities.html',
            controller: 'machinerylogactivitiesCtrl'
        }).state('nav.machineryaddqualification', {
            url: '/machineryaddqualification',
            templateUrl: 'views/machineryaddqualification.html',
            controller: 'machineryaddqualificationCtrl'
        }).state('nav.supplier', {
            url: '/supplier',
            templateUrl: 'views/supplier.html',
            controller: 'supplierCtrl'
        }).state('nav.masteraddsupplier', {
            url: '/masteraddsupplier',
            templateUrl: 'views/mastersupplier.html',
            controller: 'masteraddsupplierCtrl'
        }).state('nav.samplelist', {
            url: '/samplelist',
            templateUrl: 'views/samplelist.html',
            controller: 'samplelistCtrl'
        }).state('nav.createsample', {
            url: '/createsample',
            templateUrl: 'views/createsample.html',
            controller: 'createsampleCtrl'
        }).state('nav.createsampleinv', {
            url: '/createsampleinv',
            templateUrl: 'views/createsampleinv.html',
            controller: 'createsampleinvCtrl'
        }).state('nav.profile', {
            url: '/profile',
            templateUrl: 'views/profile.html',
            controller: 'profileCtrl'
        }).state('nav.adduserprofile', {
            url: '/adduserprofile',
            templateUrl: 'views/adduserprofile.html',
            controller: 'adduserprofileCtrl'
        }).state('nav.badgeinfo', {
            url: '/badgeinfo',
            templateUrl: 'views/badgeinfo.html',
            controller: 'badgeinfoCtrl'
        }).state('nav.addbadgeinfo', {
            url: '/addbadgeinfo',
            templateUrl: 'views/addbadgeinfo.html',
            controller: 'addbadgeinfoCtrl'
        });
    $urlRouterProvider.otherwise('/login');
});

tracehiveApp.config(function($compileProvider){
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);
});
    
    tracehiveApp.run(function($rootScope, $state) {
        
        $rootScope.$state = $state;
        
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      
      var shouldLogin = $rootScope.isLoggedIn;

        // login NOT authenticated - move to login

        if(!shouldLogin || fromState.name === "") {

           
           if(toState.name === 'login')
                    return;

                $state.go('login');

                event.preventDefault();

            } else {
                
                if(toState.name === toState.name)

                    return;

                
                $state.go(toState.name);

                event.preventDefault();

            }

      
     if (toState.isLoginRequired) {
            if (!$rootScope.isLoggedIn()) {
                $state.go('login');
                e.preventDefault();
            }
        }
          
     
        
    
    })
  $rootScope.$on('$stateChangeError',
                function (event, toState, toParams, fromState, fromParams, error) {
                    
                });

    });

})();
