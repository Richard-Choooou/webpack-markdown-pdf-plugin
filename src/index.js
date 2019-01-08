const markdownPdf = require('markdown-pdf')
const path = require('path')

class MarkdownToPdf {
    constructor(options) {
        this.options = Object.assign({}, {
            filename: './pdf/[name].pdf',
            cssPath: path.resolve(__dirname, 'resource', 'github-markdown.css')
        }, options)
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync('MyPlugin', (compilation, callback) => {
            const convertPromises = compilation.modules
                .filter(module => /\.md$/.test(module.resource))
                .map(module => this.convert(module.resource))

            Promise.all(convertPromises).then(resources => {
                resources.forEach((str, index) => {
                    let fileName = this.options.filename.replace(/(\[name\])/g, /.+(\/|\\)(.+)\.md$/.exec(mdModulesResource[index])[2])
                    compilation.assets[fileName] = compilation.assets[fileName] || {
                        source: function() {
                            return str
                        },
                        size: function() {
                            return str.length
                        }
                    }
                })
                callback()
            }).catch(e => {
                throw e
            })
        })
    }

    convert(path) {
        return new Promise((resolve, reject) => {
            markdownPdf({
                cssPath: this.options.cssPath
            }).from(path).to.buffer(null, function(err, PdfStr) {
                if (err) {
                    reject(e)
                } else {
                    resolve(PdfStr)
                }
            })
        })
    }
}

module.exports = MarkdownToPdf