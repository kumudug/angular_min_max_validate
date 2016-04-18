module.exports = function (grunt) {

    // Configurable paths for the application
    var appConfig = {
        mainLoc: 'app/main'
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        appSettings: appConfig,
        jshint: {
            beforeconcat: {
                options: {
                    reporter: 'checkstyle',
                    reporterOutput: 'app/<%= pkg.name %>.before.jshint.output.xml'
                },
                files: {
                    src: ['gruntfile.js', 'bower.json', 'package.json', '<%= appSettings.mainLoc %>/main-app.mdl.js', '<%= appSettings.mainLoc %>/**/*.js']
                },
            }
        },
        watch: {
            watchScripts: {
                files: ['<%= appSettings.mainLoc %>/main-app.mdl.js', '<%= appSettings.mainLoc %>/**/*.js'],
                tasks: ['jshint:beforeconcat']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint:beforeconcat', 'watch']);
};