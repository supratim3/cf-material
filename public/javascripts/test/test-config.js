// This creates an array of all the files that Karma finds with a suffix of
// Test.js (eg utilsTest.js) to be added to the Require JS config below
var tests = [], file;
for (file in window.__karma__.files) {
	if (window.__karma__.files.hasOwnProperty(file)) {
		if(/Spec.js$/.test(file)) {
			tests.push(file);
		}
	}
}
requirejs.config({
baseUrl: '/base/',  // Karma serves files from /base/<your-base-path>
paths: {
	/* ABC order */
    "angular": "components/angular/angular",
	"angular-mocks":"components/angular-mocks/angular-mocks",
	"angular-resource": "components/angular-resource/angular-resource",
    "angular-bootstrap": "components/angular-bootstrap/ui-bootstrap-tpls",
    "angular-ui-router": "components/angular-ui-router/release/angular-ui-router",
	'datatables': 'iidx/components/datatables/media/js/jquery.dataTables',
	"jquery": "components/jquery/jquery"	
},
shim: {
	"jquery": { exports: '$'},
	"angular": {deps: ["jquery"],exports: "angular"},
	"angular-mocks":{ deps: ["angular"] },
	"angular-ui-router": {deps: ["angular"] },
	"angular-bootstrap": {deps: ["angular"] },
	"angular-resource": {deps: ["angular"] },
	"datatables": {deps: ["jquery"]},
	'angular-bootstrap': { deps: ['angular'] },
	
	'javascripts/app/controllers': { deps: ['angular'] },
	'javascripts/app/controllers/materialSearchItemCtrl': { deps: ['javascripts/app/controllers','javascripts/app/services/modalService']},
	
	'javascripts/app/directives': { deps: ['angular'] },
	'javascripts/app/directives/angularDataTable': { deps: ['javascripts/app/directives'] },
	'javascripts/app/directives/focusOnShow': { deps: ['javascripts/app/directives'] },

	'javascripts/app/services': { deps: ['angular'] },
	'javascripts/app/services/modalService': { deps: ['javascripts/app/services'] },
	
	'javascripts/app/app': { deps: [
						'angular-resource',
						'angular-ui-router',
						 'javascripts/app/controllers/materialSearchItemCtrl'] }
},
deps: tests,  // add tests array to load our tests

callback: window.__karma__.start  // start tests once Require.js is done
});