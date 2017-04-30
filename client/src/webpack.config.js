module.exports = {
    module: {
        test: /\.css$/,
        loaders: [
            'style-loader',
            'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss?sourceMap&sourceComments',
        ],
    }
}