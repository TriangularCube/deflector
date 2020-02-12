const HtmlWebPackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

module.exports = {
    entry: './src/App.jsx',
    output: {
        filename: process.env.production
            ? '[name].[contenthash].js'
            : '[name].js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js(x?)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                },
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'react-router-dom': 'ReactRouterDOM',
    },
    plugins: [
        new HtmlWebPackPlugin({
            filename: 'index.html',
            template: './src/index.html',
        }),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        compress: true,
        port: 1234,
        historyApiFallback: true,
        hot: true,
    },
    optimization: {
        moduleIds: 'hashed',
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    // https://medium.com/hackernoon/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
                },
            },
        },
    },
}
