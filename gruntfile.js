module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');

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
    less: {
      development: {
        options: {
          paths: ['src/css']
        },
        files: {
          'src/css/style.css': 'src/less/style.less',
          'src/css/bootstrap.css': 'src/less/bootstrap/bootstrap.less'
        }
      },
      production: {
        options: {
          paths: ['assets/css']
        },
        files: {
          'src/css/style.css': 'src/less/style.less'
        }
      }
    }
  });

  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('default', ['less']);
};
