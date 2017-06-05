"use strict";

import webpack  			from 'webpack'
import AssetsPlugin 		from 'assets-webpack-plugin'
import HtmlWebpackPlugin 	from 'html-webpack-plugin'
// import ImageminPlugin 		from ('imagemin-webpack-plugin').default
import path 				from 'path'

const context = './src/webpack'

module.exports = [
	{
		// devtool: isDebug ? 'cheap-module-source-map' : 'source-map',
		context: path.resolve(__dirname, context),
		resolve: {
			modules: [path.resolve(__dirname, 'node_modules')],
			alias: {
				'ui': 'components/ui/index.js'
			},
			extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json']
		},
		name  	: "client",
		target	: "web",
		entry	: {
			client : "./",
			vendor : "./lib"
		},
		output	: {
			filename	: "[name].[chunkhash:18].js",
			path		: path.resolve(__dirname, 'dist'),
			// library		:'TRFK',
			pathinfo	: true,
			publicPath	:'/assets/'
		},
		plugins	:[
			// new webpack.DefinePlugin({
			// 	'process.env.NODE_ENV': false ? '"development"' : '"production"',
			// 	'process.env.BROWSER': true,
			// 	__DEV__: false,
			// }),

			// new webpack.HotModuleReplacementPlugin(),

			// //Webpack Bundle Analyzer
			// new BundleAnalyzerPlugin(),

			new webpack.DefinePlugin({
				// 定义全局变量
				'process.env':{
					'NODE_ENV': process.env.NODE_ENV
				}
			}),

			new webpack.optimize.CommonsChunkPlugin({
				name		: 'vendor',
				// minChunks	: 2,
				filename	: '[name].[chunkhash:18].js',
				// minChunks	: module => /node_modules/.test(module.resource)
			}),

			new AssetsPlugin({
				path		: path.resolve(__dirname, './build'),
				filename	: 'assets.json',
				prettyPrint	: true,
			}),

			// new WebPlugin({
			// 	// 输出的html文件名称，必填，注意不要重名，重名会覆盖相互文件。
			// 	filename: 'index.html',
			// 	// 该html文件依赖的entry，必须是一个数组。依赖的资源的注入顺序按照数组的顺序。
			// 	requires: ['client','vendor'],
			// }),

			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, context+'/default.html'),
				hash: false,
				//favicon: paths.client('static/favicon.ico'),
				filename: 'index.html',
				inject: 'html',
				minify: {
					collapseWhitespace: false
				}
			}),

			//  new ImageminPlugin({
			// 	disable: process.env.NODE_ENV !== 'production', // Disable during development
			// 	pngquant: {
			// 		quality: '95-100'
			// 	}
			// }),

			// Minimize all JavaScript output of chunks
			// https://github.com/mishoo/UglifyJS2#compressor-options
			// new webpack.optimize.UglifyJsPlugin({
			// 	// 最紧凑的输出
			// 	beautify: false,
			// 	// 删除所有的注释
			// 	comments: false,
			// 	compress: {
			// 		// 在UglifyJs删除没有用到的代码时不输出警告  
			// 		warnings: false,
			// 		// 删除所有的 `console` 语句
			// 		// 还可以兼容ie浏览器
			// 		drop_console: true,
			// 		// 内嵌定义了但是只用到一次的变量
			// 		collapse_vars: true,
			// 		// 提取出出现多次但是没有定义成变量去引用的静态值
			// 		reduce_vars: true,
			// 		unused: true,
			// 		dead_code: true,
			// 	},
			// 	// sourceMap: true,
			// 	// compress: {
			// 	// 	screw_ie8: true, // React doesn't support IE8
			// 	// 	warnings: isVerbose,
			// 	// 	unused: true,
			// 	// 	dead_code: true,
			// 	// },
			// 	// mangle: {
			// 	// 	screw_ie8: true,
			// 	// },
			// 	// output: {
			// 	// 	// comments: false,
			// 	// 	// screw_ie8: true,
			// 	// },
			// }),

			// new webpack.BannerPlugin({
			// 	banner: 'require("source-map-support").install();',
			// 	raw: true,
			// 	entryOnly: false,
			// }),
	
			// new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
		],

		stats: {
			// Add asset Information
			assets: false,
			// Sort assets by a field
			assetsSort: "field",
			// // Add information about cached (not built) modules
			// cached: true,
			// // Show cached assets (setting this to `false` only shows emitted files)
			// cachedAssets: true,
			// // Add children information
			// children: true,
			// // Add chunk information (setting this to `false` allows for a less verbose output)
			// chunks: true,
			// // Add built modules information to chunk information
			// chunkModules: true,
			// // Add the origins of chunks and chunk merging info
			// chunkOrigins: true,
			// // Sort the chunks by a field
			// chunksSort: "field",
			// Context directory for request shortening
			context: path.resolve(__dirname, './src/'),
			// `webpack --colors` equivalent
			colors: true,
			// // Display the distance from the entry point for each module
			// depth: false,
			// // Display the entry points with the corresponding bundles
			// entrypoints: false,
			// // Add errors
			// errors: true,
			// // Add details to errors (like resolving log)
			// errorDetails: true,
			// // Exclude modules which match one of the given strings or regular expressions
			// exclude: [],
			// // Add the hash of the compilation
			// hash: true,
			// // Set the maximum number of modules to be shown
			// maxModules: 15,
			// // Add built modules information
			// modules: true,
			// // Sort the modules by a field
			// modulesSort: "field",
			// // Show dependencies and origin of warnings/errors (since webpack 2.5.0)
			// moduleTrace: true,
			// // Show performance hint when file size exceeds `performance.maxAssetSize`
			// performance: true,
			// // Show the exports of the modules
			// providedExports: false,
			// // Add public path information
			// publicPath: true,
			// // Add information about the reasons why modules are included
			// reasons: true,
			// // Add the source code of modules
			// source: true,
			// // Add timing information
			// timings: true,
			// // Show which exports of a module are used
			// usedExports: false,
			// // Add webpack version information
			// version: true,
			// // Add warnings
			// warnings: true,
			// // Filter warnings to be shown (since webpack 2.4.0),
			// // can be a String, Regexp, a function getting the warning and returning a boolean
			// // or an Array of a combination of the above. First match wins.
			// warningsFilter: "filter" | /filter/ | ["filter", /filter/] | (warning) => ... return true|false
		},

		// Don't attempt to continue if there are any errors.
  		// bail: false,

		// cache: false,

		// devServer: {
		// 	contentBase: __dirname + "/src",  // New
		// },
		// 配置哪些文件可以脱离webpack的解析。 有些库是自成一体不依赖其他库的没有使用模块化的
		module: {
			noParse: /node_modules\/(jquey|moment|chart\.js)/
		},

		
	},
	{
		// devtool: "source-map",
		name  	: "server",
		target	: "node",
		entry	: {
			server : context+"/about.js"
		},
		output	: {
			filename: "[name].bundle.js",
			path: __dirname + "/dist",
		}
	}
];
