// const path = require("path");

// module.exports = {
//     entry: "./src/client/js/main.js",  //처리하고자 하는 파일의 위치
//     output: {             //결과물 저장 위치 및 파일 이름
//         filename: "main.js",
//         path: path.resolve(__dirname, "assets", "js"), //__dirname: 절대경로로 변환 & resolve: 절대경로 이후에 (폴더 및 파일) 경로 추가
//     },
//     module: {
//         rules: [
//           {
//             test: /\.js$/,
//             use: {
//               loader: "babel-loader",
//               options: {
//                 presets: [["@babel/preset-env", { targets: "defaults" }]],
//               },
//             },
//           },
//         ],
//       },
//     };

const path = require("path");

module.exports = {
  entry: "./src/client/js/main.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "assets", "js"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
};