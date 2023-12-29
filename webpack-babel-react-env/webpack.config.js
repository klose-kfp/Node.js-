const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const dotenvFilename = path.resolve(__dirname, "./.env");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const customEnvironment = process.env.CUSTOM_ENV
  ? process.env.CUSTOM_ENV
  : "dev";
console.log(dotenvFilename);

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "./src/index.tsx"),
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader, //CSSファイルに書き出す場合
          //"style-loader", //styletたぐに書き出す場合
          "css-loader",
          "sass-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "img/[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  // optimization: {
  //   minimizer: [new CssMinimizerPlugin()],
  // },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "js/bundle.js",
    clean: true,
  },
  resolve: {
    alias: {
      "@src": path.join(__dirname, "src/"),
    },
    extensions: [".*", ".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  performance: { hints: false },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, `.env.${customEnvironment}`),
    }),
    new webpack.DefinePlugin({
      // "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env.MY_ENV": JSON.stringify(process.env.MY_ENV),
    }),

    new MiniCssExtractPlugin({
      filename: "css/index.css",
    }),

    new HtmlWebpackPlugin({
      inject: "body",
      filename: "index.html",
      template: "./src/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "src/images", to: "images" }],
    }),
  ],
  devServer: {
    historyApiFallback: true,
    watchFiles: ["src/**/*.ts", "src/**/*.tsx", "dist/**/*"],

    static: {
      directory: path.join(__dirname, "build"),
    },
    port: 3000,
    hot: true,
  },
  target: ["web", "es5"],
};
