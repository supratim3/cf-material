// Karma configuration
// Generated on Thu Feb 25 2016 18:46:24 GMT+0530 (India Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [
		{pattern: 'components/jquery/jquery.js', included: true},
		'jasmine-jquery.js',
		{pattern: 'components/angular/angular.js', included: false},
		{pattern: 'components/angular-mocks/angular-mocks.js', included: false},
		{pattern: 'components/angular-resource/angular-resource.js', included: false},
		{pattern: 'components/angular-bootstrap/ui-bootstrap-tpls.js', included: false},
		{pattern: 'components/angular-ui-router/release/angular-ui-router.js', included: false},
		{pattern: 'iidx/components/datatables/media/js/jquery.dataTables.js', included: false},
		{pattern: 'javascripts/app/app.js', included: false},
		{pattern: 'javascripts/app/**/*.js', included: false},
		{pattern: 'javascripts/test/test-config.js', included: true},
		{pattern: 'javascripts/test/spec/**/*Spec.js', included: false}
		//{pattern: 'test/spec/*.js', included: false}
    ],
	
	plugins : [
        'karma-phantomjs-launcher',
        'karma-requirejs',
        'karma-jasmine',
        'karma-junit-reporter',
        'karma-js-coverage'
    ],


    // list of files to exclude
    exclude: [
      'javascripts/app/require.config.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
		'javascripts/app/**/*.js': 'coverage'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','junit', 'coverage'],

	 /**
     * Code Coverage options
     */
	coverageReporter : {
		type: 'html',
		dir: 'javascripts/test/reports/unit/coverage'
	},
	
	 /**
     * JUnit Reporter options
     */
    junitReporter: {
    	outputDir: 'javascripts/test/reports/unit/',
        outputFile: 'junit.xml',
        suite: 'unit',
        useBrowserName: false
    },

    // web server port
    port: 9876,

	// cli runner port
	runnerPort: 9100,

    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


	browserNoActivityTimeout: 100000,
	// If browser does not capture in given timeout [ms], kill it
	captureTimeout: 20000,
	
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
