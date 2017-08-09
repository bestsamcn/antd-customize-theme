var path = require('path');
var assetsPath = path.join(process.cwd(), 'dist', 'client');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var path = require('path');
var fs = require('fs');
var lessToJs = require('less-vars-to-js');
var themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, '..', 'theme.less'), 'utf8'));

var webpackConfig = {
    name: 'browser',
    devtool: 'cheap-module-source-map',
    entry: {
        //[app]为输出的文件名，output下的filename
        main: './src/main.js'
            //公共文件分离
    },

    output: {
        path: assetsPath,
        filename: 'js/[name].client.js',
        publicPath: '/'
            //打包require.ensure
            // chunkFilename:'js/[name].chunk.js'
    },

    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.less$/,
            loader: 'style-loader!css-loader!'+`less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(themeVariables)}}`
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: 'img/[name].[ext]'
            }
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: 'img/[name].[ext]'
            }
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)\w*/,
            loader: 'url-loader',
            query: {
                limit: 1000000,
                name: 'fonts/[name].[ext]',
            }
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader",
            query: {
                name: 'fonts/[name].[ext]',
            }

        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        // new ExtractTextPlugin('[name].css', {allChunks: false}),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new OpenBrowserPlugin({
            url: 'http://localhost:8080'
        })

    ]
}


module.exports = webpackConfig;