var path = require('path');

module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + "/src/index.js",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    }
}