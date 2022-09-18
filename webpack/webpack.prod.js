const webpack = require('webpack');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', './public/index.html'),
            minify: {
                collapseWhitespace: true,
            },
        }),
        new webpack.DefinePlugin({
            'process.env.name': JSON.stringify('prod'),
        }),
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                },
            }),
        ],
    },
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: `bundle.${uuidv4()}.js`,
    },
};
