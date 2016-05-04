/**
 * Created by PC on 2016/5/4.
 */
var gruntFile = function(grunt){
    grunt.initConfig({

        meta: {
            pkg: grunt.file.readJSON('package.json'),
            src: {
                main: 'src'
            }
        },

        requirejs: {
            compile: {
                options: {
                    baseUrl: 'src',
                    dir: 'build',
                    skipDirOptimize: false,
                    preserveLicenseComments: false,
                    generateSourceMaps: true,
                    optimize: 'uglify2'
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('default', ['requirejs']);
};

module.exports = gruntFile;