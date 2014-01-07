/*global module:false*/
module.exports = function(grunt) {

     // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        /**
        * gunt-contrib-watch
        */
        watch: {
            sass: {
                files: ['app/**/*.{scss,sass}'],
                tasks: [
                    "sass:server"
                ]
            },
            assemble: {
                files: ['app/**/*.{md,hbs,json,yml}'],
                tasks: [
                    "assemble"
                ]
            },
            js : {
                files: ["Gruntfile.js", "app/**/*.js"],
                tasks: [
                    "jshint"
                ],
                options: {
                    livereload: true,
                },
            },
            livereload: {
                // Here we watch the files the sass task will compile to
                // These files are sent to the live reload server after sass compiles to them
                files: [
                    "master.css",
                    "dist/index.html"
                ],
                options: {
                    livereload: true
                }
            },
        },

        /**
        * gunt-contrib-jshint
        */
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            all: [
                "Gruntfile.js",
                "app/**/*.js"
            ]
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
                        'master.css': 'app/ui/sass/master.scss'
                    }
                ]
            }
        },

        assemble: {
          options: {
            today: '<%= grunt.template.today() %>',
            production: false,
            flatten: true,
            contextual: {
              dest: './temp'
            },
            data: ['src/data/*.{json,yml}', 'package.json'],
            assets: './dist/ui/',
            //helpers: ['src/extensions/*.js', 'helper-prettify'],
            partials: ['app/templates/includes/**/*.{hbs,md}'],
            layoutdir: 'app/templates/layouts',
            layout: 'default.hbs',
          },
          dist: {
            options: {
                production: false
            },
            files: [
              {
                expand: true,
                cwd: 'app/pages',
                src: ['**/*.hbs'],
                dest: './dist/'
              }
            ]
          },
          prod: {
            options: {
                production: true
            },
            files: [
              {
                expand: true,
                cwd: 'app/pages',
                src: ['**/*.hbs'],
                dest: './prod/'
              }
            ]
          }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('assemble' );

    // Default task.
    grunt.registerTask("default", ["assemble:dist", "watch"]);

    grunt.registerTask("prod", ["assemble:prod"]);

};
