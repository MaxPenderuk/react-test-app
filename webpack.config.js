const webpack           = require('webpack');
const path              = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin      = require('assets-webpack-plugin');
// const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const OfflinePlugin     = require('offline-plugin');
const ManifestPlugin    = require('webpack-manifest-plugin');
const buildDirectory    = process.env.NODE_ENV === 'production' ? '' : '';

module.exports = {
    entry: ['babel-polyfill', './client/app.js'],
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                BROWSER: JSON.stringify(true),
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
            }
        }),
        new ExtractTextPlugin('[name].css'),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru|en/),
        new AssetsPlugin({path: path.join(__dirname, 'etc')}),
        new ManifestPlugin({
            seed: {
                'name': 'Test',
                'short_name': 'Test',
                'start_url': '/',
                'display': 'standalone',
                'background_color': '#fff',
                'description': 'Test site',
                'theme_color': '#db5945',
                "icons": []
            }
        })
    ],
    output: {
        path: path.join(__dirname, '/public/static/build/', buildDirectory),
        filename: 'main.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader', {
                    publicPath: '/static/build/'
                })
            },
            { test: /\.gif$/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
            { test: /\.jpg$/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },
            { test: /\.png$/, loader: 'url-loader?limit=10000&mimetype=image/png' },
            { test: /\.svg/, loader: 'url-loader?limit=26000&mimetype=image/svg+xml' },
            { test: /\.(woff|woff2|ttf|eot)/, loader: 'url-loader?limit=1' },
            { test: /\.jsx$/, loader: 'babel-loader!eslint-loader', exclude: [/node_modules/, /public/] },
            { test: /\.js$/, loader: 'babel-loader!eslint-loader', exclude: [/node_modules/, /public/] },
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.txt$/, loader: 'raw-loader' }
        ]
    },
    postcss: webpack => {
        return [
          require('postcss-import')({ addDependencyTo: webpack }),
          require('postcss-url')(),
          require('postcss-cssnext')({ browsers: ['Safari >= 8', 'iOS >= 8', 'Android >= 4.4', 'last 2 versions'] }),
          require('postcss-browser-reporter')(),
          require('postcss-reporter')(),
      ];
    },
    eslint: {
        configFile: '.eslintrc'
    },
    devServer: {
        headers: { 'Access-Control-Allow-Origin': '*' },
        disableHostCheck: true
    },
    devtool: 'cheap-module-source-map'
};
