module.exports = function(grunt) {

  var mozjpeg = require('imagemin-mozjpeg');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! Szabx did this :O <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: [
        'src/vendor/jquery/dist/jquery.min.js',
        'src/vendor/bootstrap/dist/js/bootstrap.min.js',
        'src/vendor/angular/angular.min.js',
        'src/vendor/angular-currency-filter/currencyModule.js',
        'src/js/main.js',
        'src/js/factory/*.js',
        'src/js/controller/*.js'
        ], 
        dest: 'build/js/all.js'
      }
    },
    watch: {
    	scripts: {
    		files: ['src/**/*.js', 'src/**/*.html', 'src/**/*.css', 'src/**/*.jade', 'Gruntfile.js'],
    		tasks: ['dev'],
    		options: {
    			spawn: false,
    		}
    	}
    },
    clean: ['build/js/**'],
    jshint: {
    	options: {
    		"curly": true,
    		"eqnull": true,
    		"eqeqeq": true,
    		"undef": true,
    		"globals": {
    			"jQuery": true,
    			"console": true,
    			"module": true,
    			"$": true,
    			"require": true,
          "angular": true
    		}
    	},
    	all: ['Gruntfile.js', 'src/js/*.js']
    },
    copy: {
    	main: {
    		files: [
				// includes files within path 
  				{
  					expand: true, 
  					cwd: 'src/',
  					src: ['**/*.html', 'images/*'], 
  					dest: 'build/', 
  					filter: 'isFile'
  				},
          {
            expand: true, 
            cwd: 'src/',
            src: ['vendor/**'], 
            dest: 'build/'
          },
          {
            expand: true, 
            cwd: 'src/vendor/bootstrap/',
            src: ['fonts/**'], 
            dest: 'build'
          }
        ],
      },
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'build/css/all.min.css': [
            'src/vendor/bootstrap/dist/css/bootstrap.min.css', 
            'src/vendor/bootstrap/dist/css/bootstrap-theme.min.css'
          ]
        }
      }
    },
  	// Optimize image load
    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 3,
          svgoPlugins: [{ removeViewBox: false }],
          use: [mozjpeg()]
      },
      files: [{
        expand: true,
        cwd: 'src/images', 
        src: ['*.{png,jpg,gif}'], 
        dest: 'build/images/'
      }]
    }
  }
});

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');


  // Default task(s).
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('dev', ['jshint', 'clean', 'uglify', 'cssmin', 'copy']);

};