'use strict';

angular.module('eServicesMtrl').directive('selectAllCheckbox',function($timeout){
	return {
		replace: true,
		restrict: 'E',
		scope: {
            checkboxes:  '=',
            allselected: '=allSelected',
            allclear:    '=allClear',
			disableCondAttr: '&'
        },
        template: '<input type="checkbox" ng-model="master" ng-change="masterChange()">',
		controller: function ($scope, $element,$rootScope) {
			$scope.$watch('checkboxes', function () {
                var allSet = true,
                    allClear = true;
                angular.forEach($scope.checkboxes, function (cb, index) {
					if(!$scope.disableCondAttr({item:cb})){
						if (cb.selected) {
							allClear = false;
						} else {
							allSet = false;
						}
					}
                });
                if ($scope.allselected !== undefined) {
                    $scope.allselected = allSet;
                }
                if ($scope.allclear !== undefined) {
                    $scope.allclear = allClear;
                }

                //$element.prop('indeterminate', false);
                if (allSet) {
                    $scope.master = true;
                } else if (allClear) {
                    $scope.master = false;
                } else {
                    $scope.master = false;
                   // $element.prop('indeterminate', true);
                }
            }, true);
            $scope.masterChange = function () {
                if ($scope.master) {
                    angular.forEach($scope.checkboxes, function (cb, index) {
						if(!$scope.disableCondAttr({item:cb})) {
							cb.selected = true;
						}
						else {
							cb.selected = false;
						}
                    });
                } else {
                    angular.forEach($scope.checkboxes, function (cb, index) {
                        cb.selected = false;
                    });
                }
				//$rootScope.$broadcast('ItemsSelect', {master:$scope.master});
            };
			
		}
	};
});
