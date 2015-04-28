// Karma configuration
// Generated on Mon Jul 14 2014 11:51:01 GMT-0300 (Hora oficial do Brasil)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],
    plugins : [
        'karma-jasmine',
        'karma-chrome-launcher',
        'karma-ng-html2js-preprocessor', //added this
//        'karma-ng-scenario' //added this
    ],


    // list of files / patterns to load in the browser
    files: [    
      'site/tests/lib/angular.js',
      'site/tests/lib/angular-mocks.js',
      'site/tests/lib/jquery-1.11.0.min.js',
      'site/tests/lib/bootstrap/bootstrap.min.js',
      'site/tests/lib/bootstrap/ui-bootstrap-tpls.js',
      'site/tests/lib/bootstrap/ui-bootstrap-tpls.min.js',
      'http://localhost:4000/tests/productsBackend.js', 
      'http://localhost:4000/services/externalServices.js',  
      'site/app/assets/js/app.js',
      'site/app/assets/js/app-directives.js',
      'site/tests/*.js',
      'site/app/pages/partials/*.html',
      'site/app/pages/template/*.html',
      'site/app/pages/template/bootstrap/**/*.html'
    ],


    // list of files to exclude
    exclude: [
      'site/tests/constants.tests.js',
      'site/tests/controllers.tests.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'site/app/pages/partials/*.html': ['ng-html2js'],
      'site/app/pages/template/*.html': ['ng-html2js'],
    },

    ngHtml2JsPreprocessor: {
    //  cacheIdFromPath : function(filepath) {
    //    return 'site/app/pages/' + filepath;
    //  },
      // setting this option will create only a single module that contains templates
      // from all the files, so you can load them all with module('foo')
      stripPrefix: 'site',
    //  moduleName: 'templates'
    },


    


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,

    runnerPort: 9100,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
