var express = require("express");
//var gulpList = require("./gulpfile.js");
var app = express();
app.use(express.static("public"));

app.get("/",function(req,res){
	res.send("hello");

});
//gulpList.gulpList.onGulp();
exports.onApp = function(){
	app.listen(3030);
	console.log("服务器启动成功！");
}
