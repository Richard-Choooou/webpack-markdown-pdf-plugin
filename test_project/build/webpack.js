const path = require('path')
const WebpackMarkdownToPdfPlugin = require('../../src/index')

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        filename: 'js/index.js',
        path: path.resolve('./dist'),
        publicPath: './'
    },
    resolve: {
        modules: ['node_modules'],
    }, 
    module: {
        rules: [{
            test: /\.md$/,
            use: ["html-loader", "markdown-loader"]
        }]
    },
    plugins: [
        new WebpackMarkdownToPdfPlugin()
    ]
}