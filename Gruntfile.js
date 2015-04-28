
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-karma');
  

  // Project configuration.
  grunt.util.linefeed = '\n';

  grunt.initConfig({
    ngversion: '1.2.16',
    bsversion: '3.1.1',
    pkg: grunt.file.readJSON('package.json'),
    dist: 'dist',
    filename: 'app',
    filenamecustom: '<%= filename %>-custom',
	
    less:{
  		cssmin:{
  			options: {
		      paths: ["app/style"],
		      compress: true
		    },
  			files: {
  				'incentivale/assets/style/style.css' : ['incentivale/assets/style/style.less'],
          'in/assets/style/style.css' : ['in/assets/style/style.less'],
          'aec/assets/style/style.css' : ['aec/assets/style/style.less'],
          'firstdata/assets/style/style.css' : ['firstdata/assets/style/style.less'],
          'site/app/assets/style/style.min.css' : [
            'site/app/assets/style/bootstrap.css',
            'site/app/assets/style/font-awesome.css',
            'site/app/assets/style/style.less'
          ]
          
  			}	
  		}
  		
  	},

    uglify: {
      options: {
  			mangle: false
  		},
  		compress: {
  			files: {

  				'site/app/assets/js/libs/angular.js' : [
           	'site/app/assets/js/libs/angular.min.js', 
           	'site/app/assets/js/libs/angular-cookies.min.js',
           	'site/app/assets/js/libs/angular-resource.min.js',
            'site/app/assets/js/libs/angular-sanitize.min.js',
            'site/app/assets/js/libs/angular-re-captcha.js',
            'site/app/assets/js/libs/ngStorage.js',
           	'site/app/assets/js/libs/angular-route.min.js'],

           	'site/app/assets/js/app.min.js' : [
           	  'site/app/assets/js/app-directives.js',
           		'site/app/assets/js/app.js'],          
          			
            'site/app/services/services.min.js' : [
              //'site/app/services/service/authServices.js',
              //'site/app/services/service/modalServices.js',
              //'site/app/services/service/peopleServices.js',],
              'site/app/services/service/*.js'],

           	'site/app/assets/js/pages/pages.min.js' : [
           		'site/app/assets/js/pages/page/*.js'],

          	'site/app/assets/js/libs/bootstrap/ui-bootstrap-tpls.min.js' : [
          		'site/app/assets/js/libs/bootstrap/carouselSlick.js',
              'site/app/assets/js/libs/bootstrap/ui-bootstrap-tpls.js'],

            'site/app/assets/js/libs/bootstrap/ui-utils.min.js' : [
              'site/app/assets/js/libs/bootstrap/ui-utils.js']       
  			}
		}
    },
	watch:{
  		scripts:{
  			files: [
  				'site/app/assets/js/**/**/*',
  				'site/app/assets/style/**/*',
          'site/app/services/**/*',

          'firstdata/assets/style/*',
          'firstdata/assets/style/**/*',
          'firstdata/tests/**/*',
          
          'incentivale/assets/style/*',
          'incentivale/assets/style/**/*',
          'incentivale/tests/**/*',

          'in/assets/style/*',
          'in/assets/style/**/*',
          'in/tests/**/*',

          'aec/assets/style/*',
          'aec/assets/style/**/*',
          'aec/tests/**/*',
  			],
  		  tasks: ['uglify', 'less']
      }
    }
  });

  // Default task.
  grunt.registerTask('incentivale', ['watch']);
  grunt.registerTask('in', ['watch']);
//grunt.registerTask('default', ['uglify','watch', 'test']);
  grunt.registerTask( 'load', [ 'watch' ] );

//  grunt.registerTask('test', 'Run tests on singleRun karma server', function () {
    //this task can be executed in 3 different environments: local, Travis-CI and Jenkins-CI
    //we need to take settings for each one into account
//    if (process.env.TRAVIS) {
//      grunt.task.run('karma:travis');
//    } else {
//      var isToRunJenkinsTask = !!this.args.length;
//      if(grunt.option('coverage')) {
//        var karmaOptions = grunt.config.get('karma.options'),
//          coverageOpts = grunt.config.get('karma.coverage');
//        grunt.util._.extend(karmaOptions, coverageOpts);
//        grunt.config.set('karma.options', karmaOptions);
//      }
//      grunt.task.run(this.args.length ? 'karma:jenkins' : 'karma:continuous');
//    }
//  });

  function setVersion(type, suffix) {
    var file = 'package.json';
    var VERSION_REGEX = /([\'|\"]version[\'|\"][ ]*:[ ]*[\'|\"])([\d|.]*)(-\w+)*([\'|\"])/;
    var contents = grunt.file.read(file);
    var version;
    contents = contents.replace(VERSION_REGEX, function(match, left, center) {
      version = center;
      if (type) {
        version = require('semver').inc(version, type);
      }
      //semver.inc strips our suffix if it existed
      if (suffix) {
        version += '-' + suffix;
      }
      return left + version + '"';
    });
    grunt.log.ok('Version set to ' + version.cyan);
    grunt.file.write(file, contents);
    return version;
  }

  grunt.registerTask('version', 'Set version. If no arguments, it just takes off suffix', function() {
    setVersion(this.args[0], this.args[1]);
  });

  return grunt;
};
