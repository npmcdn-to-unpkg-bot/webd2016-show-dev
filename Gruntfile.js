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
    }
	});

 // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  

  // load default tasks
  grunt.registerTask('default', ['less', 'watch']);

};