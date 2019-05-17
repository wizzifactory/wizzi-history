/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v3\next\sources\webpacks\cssstyle\ittf\webpacks\cssstyle\webpack.browser.config.js.ittf
    utc time: Wed, 19 Jul 2017 08:08:01 GMT
*/
'use strict';
var path = require('path');
var webpack = require('webpack');
var pack = {
    name: "cssstyle"
};
var paths = {
    appSrc: path.join(__dirname, 'src'), 
    appIndexJs: path.join(__dirname, 'src', 'index'), 
    appBuild: path.join(__dirname, 'dist'), 
    nodePaths: [], 
    appNodeModules: []
};
module.exports = {
    devtool: 'cheap-module-eval-source-map', 
    entry: [
        'react-hot-loader/patch', 
        require.resolve('../polyfills'), 
        paths.appIndexJs
    ], 
    output: {
        path: paths.appBuild, 
        pathinfo: true, 
        filename: 'bundle.js', 
        publicPath: '/webpack/' + pack.name
    }, 
    resolve: {
        extensions: ['.js', '.json', '.jsx'], 
        alias: {
            'react-native': 'react-native-web', 
            home: path.resolve(__dirname, '../home'), 
            // @ 'material-ui' path.resolve(__dirname, '../material-ui/src')
            // @ 'material-ui-icons' path.resolve(__dirname, '../material-ui-icons/src')
            
        }
    }, 
    module: {
        rules: [
            {
                parser: {
                    requireEnsure: false
                }
            }, 
            {
                test: /\.(js|jsx)$/, 
                loader: 'babel-loader', 
                options: {
                    babelrc: false, 
                    presets: [require.resolve('babel-preset-react-app')], 
                    cacheDirectory: true
                }
            }, 
            {
                test: /\.svg$/, 
                loader: 'file-loader'
            }, 
            {
                test: /\.md$/, 
                loader: 'raw-loader'
            }, 
            {
                test: /\.(jpg|gif|png)$/, 
                loader: 'file-loader!img-loader'
            }
        ]
    }, 
    plugins: [
        new webpack.HotModuleReplacementPlugin(), 
        new webpack.NoEmitOnErrorsPlugin()
    ]
};
