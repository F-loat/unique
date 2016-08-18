module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            reload: {
                files: ['public/js/*.js', 'public/*.html', 'public/css/*.css', 'models/*.js'],
                options: {
                    livereload: true
                }
            }
        },

        nodemon: {
            dev: {
                options: {
                    file: 'app.js',
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['./'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 80
                    },
                    cwd: __dirname
                }
            }
        },

        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-nodemon')
    grunt.loadNpmTasks('grunt-concurrent')

    grunt.option('force', true)
    grunt.registerTask('default', ['concurrent'])
}
