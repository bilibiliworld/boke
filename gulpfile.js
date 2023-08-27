var gulp = require("gulp");
var fontmin = require("gulp-fontmin");

function minifyFont(text, cb) {
  gulp
    .src("*.ttf") //原字体所在目录
    .pipe(
      fontmin({
        text: text,
      })
    )
    .pipe(gulp.dest("source/font/")) //压缩后的输出目录
    .on("end", cb);
}

gulp.task("mini-font", (cb) => {
  var buffers = [];

  gulp
    .src(["./.deploy_git/**/*.html"]) //HTML文件所在目录请根据自身情况修改
    .on("data", function (file) {
      buffers.push(file.contents);
    })
    .on("end", function () {
      var text = Buffer.concat(buffers).toString("utf-8");
      minifyFont(text, cb);
    });
});

gulp.task("default", gulp.parallel("mini-font"));