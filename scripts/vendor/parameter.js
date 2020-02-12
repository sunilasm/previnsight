//unique field   --creating directive
    angular.module('uniqueField', [])
    .directive('uniqueField', function($http) {
      var toId;
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, attr, ctrl) { 
          //when the scope changes, check the field.
          scope.$watch(attr.ngModel, function(value) {
            // if there was a previous attempt, stop it.
            if(toId) clearTimeout(toId);

            // start a new attempt with a delay to keep it from
            toId = setTimeout(function(){
              // call to some API that echo "1" or echo "0"
              $http.get('http://10.1.7.162/alten_previn/previnsight/restPhp/api/equipment/checkParametername/'+value).success(function(data) {
				//alert(data);
                //set the validity of the field
                if (data == "1") 
                {
					ctrl.$setValidity('uniqueField', false);
                }
                else if (data == "0")
                {
                    ctrl.$setValidity('uniqueField', true);
                }
              });
            }, 200);
          })
        }
      }
    });