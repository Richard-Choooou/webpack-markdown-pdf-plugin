# webpack-markdown-pdf-plugin
>webpack plugin that convert Markdown file to PDF. 

engine powerd by [markdown-pdf](https://www.npmjs.com/package/markdown-pdf).

css beased [github-markdown-css](https://www.npmjs.com/package/github-markdown-css)

# Install
```js
npm install webpack-markdown-pdf-plugin --save-dev
```

```js
yarn add webpack-markdown-pdf-plugin --dev
```

# Usage

## Minimal example
```js
const WebpackMarkdownToPdfPlugin = require('webpack-markdown-pdf-plugin')

module.exports = {
    plugins: [
        new WebpackMarkdownToPdfPlugin({
            filename: './pdf/[name].pdf'
        })
    ]
}
```

## Configuration

### filename
default: './pdf/[name].pdf'

>The output file's name, you can modify this option to change files output path and names.

### other options
you can learn more details on [markdown-pdf](https://www.npmjs.com/package/markdown-pdf) documentation.

