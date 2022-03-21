const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack')
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './public',
        port: 3000,
		historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
            },
            {
                test: /\.s?[ac]ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            }
        ]
    },
    plugins: [
		new DefinePlugin({
			'process.env.API_URL': process.env.API_URL || JSON.stringify('http://localhost:3001/api'),
		}),
        new HtmlWebpackPlugin({
            template: './templates/template-dev.html',
        }),
    ]
});
