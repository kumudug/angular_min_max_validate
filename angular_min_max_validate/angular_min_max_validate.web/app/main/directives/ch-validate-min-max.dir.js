(function() {
    'use strict';

    angular
        .module('mainApp')
        .directive('chValidateMinMax', chValidateMinMax);

    chValidateMinMax.$inject = ['$timeout'];
    
    function chValidateMinMax($timeout) {
        var directive = {
            link: link,
            require: '^ngModel',
            restrict: 'A',
            scope: {
                minVal: '@',
                maxVal: '@'
            }
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
            var changeTimeout = null;

            // Do nothing if no ng-model
            if (!ngModel) {
                return;
            }

            // Wait for digest cycle to finish
            $timeout(function () {
                var val = element[0].value;
                checkValid(parseInt(val), ngModel, scope.minVal, scope.maxVal);
            });

            // Listen for change events to enable binding
            element.bind('change keyup', function () {
                if (changeTimeout) {
                    $timeout.cancel(changeTimeout);
                    changeTimeout = null;
                }
                changeTimeout = $timeout(function () {
                    var val = element[0].value;
                    checkValid(parseFloat(val), ngModel, scope.minVal, scope.maxVal);
                },500);
            });
        }

        function checkValid(value, ngModel, min, max) {
            if (!angular.isNumber(value) || !isFinite(value)) {
                ngModel.$setValidity("minmax", false);
            } else {
                ngModel.$setValidity("minmax", true); //start by setting the value valid

                //min supplied
                if (angular.isNumber(min) || isFinite(min)) {
                    if (value < min) {
                        ngModel.$setValidity("minmax", false);
                    }
                }

                //max supplied
                if (angular.isNumber(max) || isFinite(max)) {
                    if (value > max) {
                        ngModel.$setValidity("minmax", false);
                    }
                }
            }
        }
    }

})();