module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/js/weather.js',
        dest: 'src/build/weather.min.js'
      }
    },
    watch: {
        // if any .less file changes in directory "src/css/" run the "less"-task.
        files: "src/css/*.less",
        tasks: ["less"]
    },
    less: {
      development: {
        options: {
          paths: ['src/css']
        },
        files: {
          'src/css/style.css': 'src/less/style.less'
        }
      },
      production: {
        options: {
          paths: ['assets/css'],
          /*plugins: [
            new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
            new (require('less-plugin-clean-css'))(cleanCssOptions)
          ],
          modifyVars: {
            imgPath: '"http://mycdn.com/path/to/images"',
            bgColor: 'red'
          }*/
        },
        files: {
          'src/css/style.css': 'src/less/style.less'
        }
      }
    }
  });

  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('default', ['less']);
  //grunt.registerTask('default', ['watch']);

};
