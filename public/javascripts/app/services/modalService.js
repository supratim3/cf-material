/**
 * Modal service to handle displaying modal messasge
 */
'use strict';/*global define */
define(['angular', 'javascripts/app/services'], function(angular, services){
	services.factory('modalService', function($uibModal) {
		
		var modalDefaults = {
			backdrop: true,
			keyboard: true,
			templateUrl: 'assets/html/partials/modal.partial.html'
		};

		var modalOptions = {
			closeButtonText: 'Close',
			actionButtonText: 'OK',
			headerText: 'Header Title',
			bodyText: 'Content'
		};
		
		var show = function(customModalDefaults, customModalOptions) {
			var tempModalDefaults = {};
			var tempModalOptions = {};

			angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);
			angular.extend(tempModalOptions, modalOptions, customModalOptions);
			
			if (!tempModalDefaults.controller) {
				tempModalDefaults.controller = function ($scope, $uibModalInstance) {
					$scope.modalOptions = tempModalOptions;
					$scope.modalOptions.ok = function (result) {
						$uibModalInstance.close(result);
					};
					$scope.modalOptions.close = function (result) {
						$uibModalInstance.dismiss('cancel');
					};
				};
			}

			return $uibModal.open(tempModalDefaults).result;
		};
		
		return {
			showModal: function(customModalDefaults, customModalOptions) {
				if (!customModalDefaults) customModalDefaults = {};
				customModalDefaults.backdrop = 'static';
				return show(customModalDefaults, customModalOptions);
			}
		};
	});
});