var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
//var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
//var pathToReactDOM = path.resolve(node_modules, 'react-dom/dist/react-dom.js');

module.exports = {
    entry: path.resolve(__dirname, 'app/main.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel', 
                query: {
                    presets: ["es2015", "stage-0", "react"]
                }
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    }
};