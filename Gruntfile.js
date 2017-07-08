'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    
    /*
     *  CONCAT
     *
     *
     *
     */
    concat: {
      options: {
       // banner: '<%= banner %>',
        // stripBanners: true
      },
      js: {
        src: ['app/data/js/*.js', 'app/lib/js/jquery-3.2.1.slim.min.js', 'app/lib/js/bootstrap.min.js', 'app/src/js/*.js'],
        dest: 'app/temp/js/index.js'
      },
      css: {
        src: ['app/lib/css/*.css', 'app/src/css/*.css'],
        dest: 'app/temp/css/index.css'
      }
    },

    /*
     *  UGLIFY
     *
     *
     *
     */
    uglify: {
      options: {
        // banner: '<%= banner %>'
      },
      js: {
        src: 'app/temp/js/index.js',
        dest: 'app/test/js/index.min.js'
      },
    },
    /*
     *  CSSMIN
     *
     *
     *
     */
    cssmin: {
      index:{
        files:{
          'app/test/css/index.min.css':'app/temp/css/index.css'
        }
      }
    },
    /*
     *  HTMLMIN
     *
     *
     *
     */   
    htmlmin: {                                     // Task
      index: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          'app/test/index-min.html': 'app/src/index.html'     // 'destination': 'source'
        }
      }
    },
    nodeunit: {
      files: ['test/**/*_test.js']
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        options: {
          jshintrc: 'lib/.jshintrc'
        },
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },
    /*
     *  WATCH
     *
     *
     *
     */
    watch: {
      index: {
        files: ['app/src/js/*.js', 'app/src/css/*.css', 'app/src/*.html'],
        tasks: ['concat:js', 'concat:css', 'cssmin:index', 'uglify:js', 'htmlmin:index' ]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-pagespeed');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit', 'concat', 'uglify']);
  grunt.registerTask('index1', ['concat:js', 'concat:css', 'cssmin:index', 'uglify:js', 'htmlmin:index' ]);

};
