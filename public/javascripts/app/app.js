'use strict';
define([
	"jquery",
	"angular",
	"angular-resource",
	"angular-ui-router",
	"angular-bootstrap",
	"javascripts/app/directives",
	"javascripts/app/controllers",
	"javascripts/app/services",
	"datatables"
], function(){
	"use strict";

	var app = angular.module('mm-webapp-material', ['ngResource',"ui.router", 'ui.bootstrap', 'mm-webapp-material.services', 'mm-webapp-material.controllers', 'mm-webapp-material.directives']);

	app.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
		// $translateProvider.useLoader('$translatePartialLoader', {
			// urlTemplate: 'assets/translations/{lang}/{part}.json'
		// });

		// $translateProvider.fallbackLanguage('ENG');
		// $translateProvider.preferredLanguage('ENG');
		
		$httpProvider.defaults.headers.common['Accept'] = 'application/json';
		$httpProvider.defaults.headers.common['Content-Type'] = 'application/json';

		$urlRouterProvider.otherwise('/shopcartsummary');
		$stateProvider
			.state('mtrlapp', {
				url: '',
				abstract: true,
				views: {
					"":{
						templateUrl: 'assets/html/page/main.html'
					},
					'header@mtrlapp': { templateUrl: 'assets/html/partials/header.html' }
				}
			})
			.state('mtrlapp.shopcartsummary', {
				url: '/shopcartsummary',
				templateUrl: 'assets/html/partials/shopcartsummary.html',
				controller: 'materialSearchItemCtrl'
			});
		// Enable cross domain calls
		$httpProvider.defaults.useXDomain = true;
		$httpProvider.defaults.withCredentials = true;    
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	});
	return app;
});