const path = require("path");
// importuję bibliotekę [path] z [node.js]

const HtmlWebpackPlugin = require("html-webpack-plugin");
// importuję odpowiedni plugin

module.exports = {
  entry: "./assets/js/script.js",
  // definiuję plik wejściowy

  output: {
    path: path.resolve(__dirname, "build"),
    // definiuję ścieżkę wyjściową
    filename: "script.min.js",
    // definiuję nazwę pliku wyjściowego
  },

  devServer: {
    port: 3000,
    static: "./",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      // wskazuję plik źródłowy
      filename: "index.html",
      // określam nazwę dla pliku
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        // określam, jakie pliki
        // będą brane pod uwagę
        exclude: /node_modules/,
        // określam wykluczenia
        use: "babel-loader",
        // określam, jaki [loader]
        // ma być wykorzystany
      },

      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
    // ...
  },
};
