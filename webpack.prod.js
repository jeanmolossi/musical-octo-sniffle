const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack')
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
            },
            {
                test: /\.s?[ac]ss$/,
                use: [
					MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            }
        ]
    },
	externals: {
		react: "React",
		"react-dom": "ReactDOM",
	},
    plugins: [
		new DefinePlugin({
			'process.env.API_URL': JSON.stringify(process.env.API_URL),
		}),
        new HtmlWebpackPlugin({
            template: './templates/template-prod.html',
        }),
		new MiniCssExtractPlugin({
			filename: 'main-bundle-[hash].css',
		})
    ]
});
