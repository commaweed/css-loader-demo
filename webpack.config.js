const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const cssLoader = {
	loader: 'css-loader',
	query: {
		modules: true,
		importLoader: 1,
		localIdentName: '[path]__[name]__[local]__[hash:base64:5]'
	}
};

// either use inline style in header element or as a separate file (i.e. separate file = true)
const shouldUseExtractPlugin = true;
const cssLoaders = !shouldUseExtractPlugin
	? [ 'style-loader', cssLoader, 'sass-loader' ]
	: ExtractTextPlugin.extract({
			fallback: 'style-loader',
			loader: [ cssLoader, 'sass-loader' ],
			publicPath: '/dist'
		});

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.s?css$/i,
				use: cssLoaders
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'template.html',
			title: 'css-loader-demo',
			filename: 'index.html',
			// favicon: 'path/to/icon',
			hash: true,
			minify: {
				collapseWhitespace: false
			}
		}),
		new ExtractTextPlugin({
			filename: 'app.bundle.css',
			disable: false,
			allChunks: true
		})
	]
};
