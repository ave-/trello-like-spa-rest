/**
 * `less`
 *
 * ---------------------------------------------------------------
 *
 * Compile your LESS files into a CSS stylesheet.
 *
 * By default, only the `assets/styles/importer.less` is compiled.
 * This allows you to control the ordering yourself, i.e. import your
 * dependencies, mixins, variables, resets, etc. before other stylesheets)
 *
 * For usage docs see:
 *   https://github.com/gruntjs/grunt-contrib-less
 *
 */
module.exports = function (grunt)
{

  grunt.config.set('less', {
    dev: {
      files: [
        {
          expand: true,
          cwd   : 'assets/styles/',
          src   : ['importer.less'],
          dest  : '.tmp/public/styles/',
          ext   : '.css'
        },
        //bootstrap less
        {
          expand: true,
          cwd   : 'bower_components/bootstrap/less',
          src   : ['bootstrap.less'],
          dest  : '.tmp/public/styles/',
          ext   : '.css'
        },
        //font-awesome less
        {
          expand: true,
          cwd   : 'bower_components/font-awesome/less',
          src   : ['font-awesome.less'],
          dest  : '.tmp/public/styles/',
          ext   : '.css'
        }
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
};
