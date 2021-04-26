const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
function resolve(dir) {
    return path.join(__dirname, dir);
}
const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'example/lib'),
        publicPath: '/',
        filename: 'index.js',
        libraryTarget: 'umd',
        library: 'VaUiElementui',
        umdNamedDefine: true,
        globalObject: 'typeof self !== \'undefined\' ? self : this'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@vue/babel-preset-jsx']
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        alias:{
            '@':resolve('src')
        },
        extensions: [
            '.js',
            '.vue'
        ]
    },
    devServer: {
        host: '0.0.0.0',
        port: 8085,
        publicPath: '/',
        hot: true
    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        },
        'vue-router': {
            root: 'VueRouter',
            commonjs: 'vue-router',
            commonjs2: 'vue-router',
            amd: 'vue-router'
        },
        vuex: {
            root: 'vuex',
            commonjs: 'vuex',
            commonjs2: 'vuex',
            amd: 'vuex'
        },
        // axios: 'axios'
    },
    plugins: [
        new VueLoaderPlugin(),
        // new BundleAnalyzerPlugin(),
    ]
};

module.exports = config;