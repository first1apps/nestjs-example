const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// Imports
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const WebpackSourceMapSupport = require("webpack-source-map-support");

// Exports
module.exports = {

    // Context
    context: __dirname,

    // Entry
    entry: './start.js',

    // Target
    target: 'node',

    // Externals
    externals: [
        // /^(?!\@my\/)[\s\S]*$/ // Ignore anything that isn't @my
        nodeExternals({
            whitelist: [/^@my/],
        })
    ],

    // Output
    output: {
        path: path.join(__dirname, './dist/'),
        filename: '[name].js',
        libraryTarget: "commonjs"
    },

    // Resolve
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },

    // DevTool
    // - false
    // - 'source-map'
    // - 'eval-source-map'
    // - 'inline-source-map'
    devtool: "source-map",

    // Module
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    { loader: 'cache-loader' },
                    {
                        loader: 'thread-loader',
                        options: {
                            // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                            workers: require('os').cpus().length - 1,
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            happyPackMode: true // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
                        }
                    }
                ]
            }
        ]
    },

    // Plugins
    plugins: [
        new WebpackSourceMapSupport(),
        new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
        // new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
};

