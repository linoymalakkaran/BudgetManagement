const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    WEBPACK_MODE = process.env.npm_lifecycle_event,
    output_dir = path.resolve(__dirname, '..', 'server', 'public')
    ;

const config = {
    entry: ['babel-polyfill', path.resolve(__dirname, 'src', 'js', 'index.jsx')],
    output: {
        path: output_dir,
        filename: '[name].js'
    },
    devtool: (WEBPACK_MODE === 'build') ? false : 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader?modules=true', 'postcss-loader']
                })
            },
            {
                test: /\.js[x]?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            }
        ]
    },
    devServer: {
        contentBase: output_dir,
        compress: true,
        port: 8888
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html')
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': (WEBPACK_MODE === 'build')
                ? JSON.stringify('production') : JSON.stringify('development'),
            WEBPACK_MODE: JSON.stringify(WEBPACK_MODE),
            REST_URL_BASE:
                JSON.stringify(`http://localhost:9191/app-budget-management/api`)
        }),
        new ExtractTextPlugin('main.css'),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'src', 'images'),
            to: path.resolve(output_dir, 'images')
        }])
    ]
};

if (WEBPACK_MODE === 'build') {
    config.plugins = [...config.plugins, new UglifyJsPlugin()]
}

module.exports = config;