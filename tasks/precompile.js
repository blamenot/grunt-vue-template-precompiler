const compiler = require('vue-template-compiler');
module.exports = function (grunt) {
    grunt.registerMultiTask('vue-template-precompile', 'Precompile vue templates from HTML to js files.', function () {
        var options = this.options({
            moduleType: 'amd'
        }),
            moduleHeader,
            moduleFooter;

        //defining the function body surroundings, Module header and footer.
        switch (options.moduleType.toLowerCase()) {
            case 'amd':
                moduleHeader = 'define(function() { return function(){';
                moduleFooter = '};});'
                break;
            case 'commonjs':
                moduleHeader = 'module.exports = function() {';
                moduleFooter = '};'
                break;
            case 'es6':
                moduleHeader = 'export default function() {';
                moduleFooter = '}'
                break;
            default:
                return grunt.log.error('Unsuported module type: ' + options.moduleType 
                        + ', please use on of the following: "amd", "commonjs", "es6"');
                break;
        }
        //Processing each file
        this.files.forEach(function(file) {
            // Each source file will have an output file containg js module with render function; 
            if(!grunt.file.exists(file.src[0])) {
                return grunt.log.warn('Source file ' + file.src[0] + ' not found');
            }
            var HTMLContents = grunt.file.read(file.src[0]);
            var jsContents = compiler.ssrCompile(HTMLContents);
            if(jsContents.errors && jsContents.errors.length) {
                grunt.log.error('Error compiling file ' + file.src[0] + '.');
                jsContents.errors.forEach(function(error) {
                    grunt.log.error(error);
                });
            }
            grunt.file.write(file.dest, moduleHeader + jsContents.render + moduleFooter);
            grunt.log.writeln('File "' + file.dest + '" created.');
        });
    });
}