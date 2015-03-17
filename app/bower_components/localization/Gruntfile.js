/* global module:false */
module.exports = function(grunt) {
   grunt.initConfig({
      app: grunt.file.readJSON('package.json'),
      jshint: {
         options: {
            jshintrc: '.jshintrc'
         },
         gruntfile: {
            src: 'Gruntfile.js'
         },
         files: [ 'localization.js' ]
      },
      uglify: {
         jsxc: {
            options: {
               mangle: false,
               sourceMap: true,
               preserveComments: 'some'
            },
            files: {
               'localization.min.js.erb': ['localization.js']
            }
         }
      }
   });

   // These plugins provide necessary tasks.
   grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-contrib-uglify');

   // Default task
   grunt.registerTask('default', [ 'jshint', 'uglify' ]);
};
