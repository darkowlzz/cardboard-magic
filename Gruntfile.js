/**
 * Gruntfile.js
 *
 * Copyright (c) 2012 quickcue
 */

var path = require('path');

module.exports = function(grunt) {
    // Load dev dependencies
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take for build time optimizations
    require('time-grunt')(grunt);

    // Configure the app path
    var base = 'app';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bowercopy: grunt.file.readJSON('bowercopy.json'),
        // express server settings
        express: {
          myServer: {
            options: {
              server: path.resolve(__dirname, 'server.js'),
              port: 9000,
              hostname: '0.0.0.0',
              open: true,
              bases: base,
              livereload: 35729
              //serverreload: true
            }
          }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [ base + '/js/*.js' ]
        },
        jsonlint: {
            pkg: [ 'package.json' ],
            bower: [ '{bower,bowercopy}.json' ]
        },
        watch: {
            options: {
                livereload: true
            },
            // Watch javascript files for linting
            js: {
                files: [
                    '<%= jshint.all %>'
                ],
                tasks: ['jshint']
            },
            json: {
                files: [
                    '{package,bower}.json'
                ],
                tasks: ['jsonlint']
            },
        }
    });

    grunt.registerTask('serve', function () {
        grunt.task.run([
            'express',
            'watch'
        ]);
    });

    grunt.registerTask('default', ['newer:jsonlint', 'newer:jshint', 'serve']);
};
