/**
 * User: Raja Boppana
 * Date: 2/22/16
 * Time: 2:36 PM
 */
 
 define(['angular-mocks', 'jquery', 'javascripts/app/app'], function(angularmocks, $, app){

	describe('Unit: Testing materialSearchItemCtrl', function(){
		var ctrl;
		var mockScope;
		var mockWindow;
		var rootScope;
		var $compile;

		beforeEach(angular.mock.module('mm-webapp-material'));


		beforeEach(angular.mock.inject(function($rootScope, $window, _$compile_){
			mockScope = $rootScope.$new();
			rootScope = $rootScope;
			mockWindow = {};
			$compile = _$compile_;
			mockModel = {"description":["Air Comp Mag Valve"],
						"itemNumber":["41A212869P5"]};

		}));

	    afterEach( function() {
	        $('body').empty();
	    });

		xdescribe("Unit testing TypeAhead function $scope.searchItems", function(){
			it('validate typeahead dom element', function(){
				inject(function ($controller) {
					ctrl = $controller('materialSearchItemCtrl', {
						$scope: mockScope,
						$window: mockWindow
					});
					var typeAhead = $('<input type="text" ng-model="itemSearched" id="itemSearchInput" uib-typeahead="item as item.itemNumber_t for item in mockScope.searchItems($viewValue)">')
					$('body').html('<div id="typeAheadContainer">').find('div').append(typeAhead);
					
					mockScope.searchItems = jasmine.createSpy('searchItems');
					//mockEvent = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
					var mockEvent = jQuery.Event("keypress");
					mockEvent.which= 65;
					mockEvent.keyCode = 65;
					//var searchInput = document.getElementById('itemSearchInput');
					//searchInput.dispatchEvent(mockEvent)
					typeAhead.trigger(mockEvent);
					expect(mockScope.searchItems).toHaveBeenCalled();
				});
			});
	    });
		
		describe("Unit testing TypeAhead $scope.clearSearch", function(){
			it('Clear Scope and dom element value', function(){
				inject(function ($controller) {
					ctrl = $controller('materialSearchItemCtrl', {
						$scope: mockScope,
						$window: mockWindow
					});
					var typeAhead = $('<input type="text" id="itemSearchInput" uib-typeahead="item as item.itemNumber_t for item in searchItems($viewValue)">')
					$('body').html('<div id="typeAheadContainer">').find('div').append(typeAhead);
					$("#itemSearchInput").val("abc");
					mockScope.itemSearched = "abc";
					mockScope.clearSearch();
					
					expect(mockScope.itemSearched).toEqual("");
					expect($("#itemSearchInput")).toHaveText("");
				});
			});
	    });
		
		describe("Unit testing $scope.formatInputLabel", function(){
			it('format typeahead serach input to show both item number and description', function(){
				inject(function ($controller) {
					ctrl = $controller('materialSearchItemCtrl', {
						$scope: mockScope,
						$window: mockWindow
					});
					// var formattedString = $scope.formatInputLabel(mockModel);
					expect(mockScope.formatInputLabel(mockModel)).toEqual("41A212869P5(Air Comp Mag Valve)");
				});
			});
	    });
	});

});