/**
 * `clean`
 *
 * ---------------------------------------------------------------
 *
 * Remove the files and folders in your Sails app's web root
 * (conventionally a hidden directory called `.tmp/public`).
 *
 * For usage docs see:
 *   https://github.com/gruntjs/grunt-contrib-clean
 *
 */
module.exports = function(grunt) {

  grunt.config.set('clean', {
    options: {
      'force': true
    },
    dev: ['.tmp/public/**'],
    bower: ['assets/js/dependencies/*', '!assets/js/dependencies/sails.io.js'],
    build: ['www']
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
};
