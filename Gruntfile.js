module.exports = function(grunt) {
 
grunt.initConfig({
	pkg:grunt.file.readJSON('package.json'),
	jshint: {
      files: ['Gruntfile.js', 'js/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    less: {
    	development: {
    		files: {
	    		"styles/main.css":"styles/main.less"
	    	}	
    	}
	  },
    watch: {
      files: ['styles/main.less'],
      tasks: ['default']
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'styles/',
          src: ['*.css', '!*.min.css'],
          dest: 'styles/',
          ext: '.min.css'
        }]
      },

      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },

      target: {
        files: {
          'styles/styles.min.css': ['styles/normalize.min.css', 'styles/grid.min.css', 'styles/main.min.css']
        }
      }
    },

    uglify: {
      my_target: {
        files: {
          'js/script.min.js': ['js/script.js']
        }
      }
    }
});

 // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');  

  // load default tasks
  grunt.registerTask('default', ['less', 'watch']);


};