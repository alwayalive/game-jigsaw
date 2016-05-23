module.exports = {
	entry : [ "./index.js" ],
	output: {
		path : __dirname,
		// publicPath : "/",
		filename: "bundle.js"
	},
	module: {
		loaders : [{
			//exclude 排出node_modules文件夹里面的js文件
			test : /\.js$/, exclude: /node_modules/ , loader: "babel-loader"
		}]
	}
};