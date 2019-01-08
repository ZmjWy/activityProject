var gulp = require("gulp");
var cleancss = require("gulp-clean-css");
var minjs = require("gulp-uglify");
var less = require("gulp-less");
var appList = require("./app.js");

gulp.task("mincss",function(){
	gulp.src("public/src/style/*.css")
		.pipe(cleancss())
		.pipe(gulp.dest("public/dist/style"));
})

gulp.task("minjs",function(){
	gulp.src("public/src/script/*.js")
		.pipe(minjs(
            {
                mangle:{except:['require','exports','module','$']},//排除混淆关键字
                compress:true,//类型：Boolean 默认：true 是否完全压缩
                ie8: true,
            }
		))
		.pipe(gulp.dest("public/dist/script"));
})

gulp.task("less",function(){
	gulp.src("public/src/less/*.less")
		.pipe(less())
		.pipe(gulp.dest("public/src/style"));
})

gulp.task("watch",function(){
	gulp.watch("public/src/style/*.css",["mincss"]);
	gulp.watch("public/src/script/*.js",["minjs"]);
	gulp.watch("public/src/less/*.less",["less"]);
})
appList.onApp();
gulp.task("default",["mincss","minjs","less","watch"]);




