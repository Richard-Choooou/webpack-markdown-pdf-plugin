const markdownPdf = require('markdown-pdf')
const path = require('path')
const through2 = require('through2')

class MarkdownToPdf {
    constructor(options) {
        this.options = Object.assign({}, {
            filename: './pdf/[name].pdf',
            cssPath: path.resolve(__dirname, './resource/github-markdown.css'),
            preProcessHtml: function() {
                let isBegin = true
                return through2({ objectMode: true, allowHalfOpen: false }, function (chunk, enc, callback) {
                    if (isBegin) {
                        const prefix = Buffer.from('<div class="markdown-body">', 'UTF-8')
                        this.push(Buffer.concat([prefix, chunk]))
                        isBegin = false
                    } else {
                        this.push(chunk)
                    }
                    callback()
                }, function(cb) {
                    this.push(Buffer.from('</div>', 'UTF-8'));
                    cb()
                })
            }
        }, options)
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync('MyPlugin', (compilation, callback) => {
            const convertPromises = compilation.modules
                .filter(module => /\.md$/.test(module.resource))
                .map(module => this.convert(module.resource))

            Promise.all(convertPromises).then(resources => {
                resources.forEach((data, index) => {
                    let fileName = this.options.filename.replace(/(\[name\])/g, /.+(\/|\\)(.+)\.md$/.exec(data.path)[2])
                    compilation.assets[fileName] = compilation.assets[fileName] || {
                        source: function() {
                            return data.pdfStr
                        },
                        size: function() {
                            return data.pdfStr.length
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
            markdownPdf(this.options).from(path).to.buffer(null, function(err, pdfStr) {
                if (err) {
                    reject(e)
                } else {
                    resolve({path: path, pdfStr: pdfStr})
                }
            })
        })
    }
}

module.exports = MarkdownToPdf