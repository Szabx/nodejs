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
        src: 'src/**/*.js',
        dest: 'build/js/all.js'
      }
    },
    watch: {
    	scripts: {
    		files: ['src/**/*.js', 'src/**/*.html', 'src/**/*.css', 'src/**/*.jade'],
    		tasks: ['uglify'],
    		options: {
    			spawn: false,
    		}
    	}
    },
    clean: ['build/**'],
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
    			"require": true
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
				}/*,

				// includes files within path and its sub-directories 
				{
					expand: true, 
					src: ['path/**'], 
					dest: 'dest/'
				},

				// makes all src relative to cwd 
				{
					expand: true, 
					cwd: 'path/', 
					src: ['**'], 
					dest: 'dest/'
				},

				// flattens results to a single level 
				{
					expand: true, 
					flatten: true, 
					src: ['path/**'], 
					dest: 'dest/', 
					filter: 'isFile'
				},*/
			],
		},
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


  // Default task(s).
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('dev', ['jshint', 'clean', 'uglify', 'copy', 'imagemin']);

};