const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './index.tsx',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.scss'],
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
    },
    plugins: [new CleanWebpackPlugin()]
}
