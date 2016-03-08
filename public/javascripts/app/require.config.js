require.config({
    'baseUrl': './assets',
	'waitSeconds': 200,
    'paths': {
    	"jquery": "components/jquery/jquery",
        "angular": "components/angular/angular",
		"angular-resource": "components/angular-resource/angular-resource",
        "angular-bootstrap": "components/angular-bootstrap/ui-bootstrap-tpls",
        "angular-ui-router": "components/angular-ui-router/release/angular-ui-router",
        "main": "javascripts/app/main",
		
		"datatables": "iidx/components/datatables/media/js/jquery.dataTables"
    },
    'shim': {
        "jquery": {
            exports: '$'
        },
        "angular": {
            deps: ["jquery"],
            exports: "angular"
        },
        "angular-ui-router": {
            deps: ["angular"]
        },
		"angular-bootstrap": {
            deps: ["angular"]
        },
		"angular-resource": {
            deps: ["angular"]
        },
		"datatables": {
            deps: ["jquery"]
        }
    }
});
