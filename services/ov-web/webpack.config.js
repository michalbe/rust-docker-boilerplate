const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const path = require('path');

const postCSSLoaderOptions = {
    // Necessary for external CSS imports to work
    // https://github.com/facebook/create-react-app/issues/2677
    ident: 'postcss',
    plugins: () => [
        require('postcss-flexbugs-fixes'),
        autoprefixer({
            flexbox: 'no-2009',
        }),
    ],
};

const config = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'webroot'),
        filename: 'bundle.js'
    },
		mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
           {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  modules: true,
                  localIdentName: '[path]__[name]___[local]',
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: postCSSLoaderOptions,
              },
            ],
          },
        ]
    }
};
module.exports = config;
