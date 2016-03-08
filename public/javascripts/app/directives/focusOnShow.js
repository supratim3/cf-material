'use strict';
require(['angular', 'javascripts/app/directives'], function (angular, directives){
	directives.directive('focusOnShow',function($timeout){
		return {
			restrict: 'A',
			link: function($scope, $element, $attr) {
				if ($attr.ngShow){
					$scope.$watch($attr.ngShow, function(newValue){
						if(newValue){
							$timeout(function(){
								$element.focus();
							}, 0);
						}
					});      
				}
			}
		};
	});
});
