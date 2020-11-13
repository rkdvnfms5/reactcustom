const path = require("path");

//Webpack이 Html을 인식
const HtmlWebpackPlugin = require("html-webpack-plugin");	//빌드 과정을 통해 html파일로 번들링 해주는 모듈
// const CleanWebpackPlugin = require("clean-webpack-plugin");	//프로젝트 배포를 위해 빌드할 때 기존에 만들어져있던 빌드 폴더를 삭제하고 새로 빌드 하는 모듈
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // v3.0.0 부터 사용법이 바뀜

const outputDirectory = "build";

module.exports = {
		entry : "./src/client/index.js",	//Webpack이 bundling을 시작하는 포인트
		output: {
			filename: "bundle.js",	//bundling 결과 파일명
			path : path.resolve(__dirname, outputDirectory),
		},
		resolve : {extensions : ["*", ".js", ".jsx"] }, //import될 수 있는 파일 확장자 명
		module : {	//규칙마다 어떤 loader로 파일을 읽어올지 설정
			rules : [
				{	//rule 1	
					test : /\.(js|jsx)$/,	//~~~.js 파일인 경우
					exclude : /node_module/,
					use : { loader : "babel-loader" }	//적용될 loader	bable-loader:Webpack을 사용할 때 babel을 적용하기위한 라이브러리
					//babel-loader로 Babel과 Webpack을 연동
				},
				{	//rule 2
					test : /\.css$/,//~~~.css 파일의 경우
					use : ["style-loader", "css-loader"]	//적용될 loader
				},
				{	//rule 3
					test : /\.(png|jpg|svg|gif)/,//이미지 파일의 경우
					use : { loader : "file-loader"}	//적용될 loader
				}
			]
			
		},
		devServer: {
			contentBase : path.join(__dirname, "src/client"),
			hot : true,
			open : false,
			port : 3001
		},
		plugins : [
//			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				template: "./public/index.html"
			})
		]
		
};