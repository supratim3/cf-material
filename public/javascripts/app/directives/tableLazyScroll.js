'use strict';

angular.module('eServicesMtrl').directive('tableLazyScroll',function(){
	return {
		 restrict: "A",
		link: function (scope, element, attrs) {
			var processingScroll = false;
			var visibleHeight = element.height();
			var threshold = 10;

			element.scroll(function () {
				var scrollableHeight = element.prop('scrollHeight');
				var hiddenContentHeight = scrollableHeight - element.height();

				if (hiddenContentHeight > 0 && hiddenContentHeight - element.scrollTop() <= threshold) {
					// Scroll is almost at the bottom. Loading more rows
					scope.$apply(attrs.tableLazyScroll);
				}
			});
		}
	};
});
