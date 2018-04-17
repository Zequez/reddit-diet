const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

let p = (pa) => path.resolve(__dirname, pa)

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: p('dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:3]',
          'sass-loader',
          'sass-resources-loader?resources=./src/vars.sass'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
      new HtmlWebpackPlugin({title: 'Reddit Diet', template: 'src/index.html'}),
      new CleanWebpackPlugin(['dist'], {exclude: ['README.md', 'LICENSE', '.git', 'CNAME']}),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],
}
