const path = require('path');
module.exports = {
    entry: {
        ['basic']: './examples/basic/src/app.js',
        ['basic-substore']: './examples/basic-substore/src/app.js',
        ['github-users']: './examples/github-users/src/app.js',
        ['github-users-substore']: './examples/github-users-substore/src/app.js',
        ['vanilla-react']: './examples/vanilla-react/src/app.js',
    },
    output: {
        filename: './examples/[name]/dist/bundle.js'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'es2015']
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            redu: path.resolve(__dirname, 'redu.js')
        }
    }
};
