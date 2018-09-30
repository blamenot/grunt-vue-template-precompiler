module.exports = function (grunt) {
    grunt.initConfig({
        'watch': {
            composer: {
                files: '../composer/templates/*.html',
                tasks: ['vue-template-precompile']
            }
        },
        'vue-template-precompile': {
            composer: {
                files: [
                    {
                        expand: true,     // Enable dynamic expansion.
                        src: '../composer/templates/*.html',
                        dest: './',   // Destination path prefix.
                        ext: '.js',   // Dest filepaths will have this extension.
                    }
                ],
                //Please note that es6 modules are in strict mode, and vue compliler returns function that uses with(this) directive;
                options: {
                    moduleType: 'es6' //amd, commonjs or es6 
                }
            }
        }
    });
    grunt.task.loadTasks('./tasks/');
    grunt.task.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', 'watch');
}