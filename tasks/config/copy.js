/**
 * `copy`
 *
 * ---------------------------------------------------------------
 *
 * Copy files and/or folders from your `assets/` directory into
 * the web root (`.tmp/public`) so they can be served via HTTP,
 * and also for further pre-processing by other Grunt tasks.
 *
 * #### Normal usage (`sails lift`)
 * Copies all directories and files (except CoffeeScript and LESS)
 * from the `assets/` folder into the web root -- conventionally a
 * hidden directory located `.tmp/public`.
 *
 * #### Via the `build` tasklist (`sails www`)
 * Copies all directories and files from the .tmp/public directory into a www directory.
 *
 * For usage docs see:
 *   https://github.com/gruntjs/grunt-contrib-copy
 *
 */
module.exports = function (grunt)
{

  grunt.config.set('copy', {
    dev  : {
      files: [
        // assets directory
        {
          expand: true,
          cwd   : './assets',
          src   : ['**/*.!(coffee|less)','!templates/**'],
          dest  : '.tmp/public'
        },
        //font-awesome fonts
        {
          expand: true,
          cwd: './bower_components/font-awesome/fonts/',
          src: ['**/*'],
          dest: '.tmp/public/fonts'
        }
      ]
    },
    //copy bower assets into assets directory (this task is running before copy:dev)
    bower: {
      files: [
        //jquery js
        {
          expand: true,
          cwd: './bower_components',
          src: [
          'jquery/dist/jquery.min.js',
          'jquery-ui/ui/core.js',
          'jquery-ui/ui/widget.js',
          'jquery-ui/ui/mouse.js',
          'jquery-ui/ui/sortable.js'
          ],
          flatten: true,
          dest: './assets/js/dependencies/jquery'
        },
        //angular js
        {
          expand: true,
          cwd: './bower_components',
          src: [
            'angular/angular.js',
            'angular-animate/angular-animate.js',
            'angular-aria/angular-aria.js',
            'angular-resource/angular-resource.js',
            'angular-route/angular-route.js',
            'angular-sanitize/angular-sanitize.js',
            'angular-messages/angular-messages.js',
            'angular-bootstrap/ui-bootstrap-tpls.js',
            'angular-ui-router/release/angular-ui-router.js',
            'angular-ui-sortable/sortable.js'
          ],
          flatten: true,
          dest: './assets/js/dependencies'
        }
      ]
    },
    build: {
      files: [
        {
          expand: true,
          cwd   : '.tmp/public',
          src   : ['**/*'],
          dest  : 'www'
        }
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
};
