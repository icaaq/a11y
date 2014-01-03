/*global module:false*/
module.exports = function(grunt) {

     // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        watch: {
            sass: {
                files: ['/app/assets/*.scss'],
                tasks: [
                    "sass:server"
                ]
            }
        },

        /**
        * gunt-contrib-sass
        */
        sass: {
            options: {
                style: 'expanded',
                debugInfo: false,
                lineNumbers: true,
                //Sourcemaps require SASS 3.3.0, gem install sass --pre
                //sourcemap: true
            },
            server: {
                files: [
                    {
                        'master.css': 'app/assets/master.scss'
                    }
                ]
            }
        },

        assemble: {
          options: {
            today: '<%= grunt.template.today() %>',
            production: false,
            flatten: true,
            // plugins: ['assemble-contrib-contextual'],
            contextual: {
              dest: './temp'
            },
            data: ['src/data/*.{json,yml}', 'package.json'],
            assets: './assets/',
            //helpers: ['src/extensions/*.js', 'helper-prettify'],
            partials: ['app/templates/includes/**/*.{hbs,md}'],
            layoutdir: 'app/templates/layouts',
            layout: 'default.hbs',
            marked: {sanitize: false },
            prettify: {
              indent: 2,
              condense: true,
              padcomments: true
            }
          },
          pages: {
            files: [
              {
                expand: true,
                cwd: 'app/pages',
                src: ['*.hbs'],
                dest: './dist/'
              }
            ]
          }
        }
    });

    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('assemble' );

    // Default task.
    grunt.registerTask("default", ["assemble", "watch"]);

};
