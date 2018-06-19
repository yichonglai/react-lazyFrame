const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const commonConfig = require('./webpack.common.config.js');

const devConfig = {
    devtool: 'inline-source-map',
    entry: {
        app: [
            'babel-polyfill',
            'react-hot-loader/patch',
            path.join(__dirname, 'src/index.js'),
        ],
    },
    output: {
        filename: '[name].[hash].js',
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader?modules&localIdentName=[local]-[hash:base64:8]', 'postcss-loader', 'less-loader'],
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
        ],
    },
    plugins: [
       /*  new webpack.DefinePlugin({//模拟数据变量
            MOCK: true
        }) */
        new webpack.LoaderOptionsPlugin({
            options: {
                eslint: {
                    configFile: './.eslintrc.js',
                },
            },
        }),
    ],
    devServer: {
        port: 8030,
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true,
        // host: '0.0.0.0',
        /* proxy: {
            "/api/*": "http://localhost:8090/$1"
        } */
    },
};

module.exports = merge({
    customizeArray(a, b, key) {
        if (key === 'entry.app') {
            return b;
        }
        return undefined;
    },
})(commonConfig, devConfig);
