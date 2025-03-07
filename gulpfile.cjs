const gulp = require("gulp");
const babel = require("gulp-babel");
const ts = require("gulp-typescript");
const del = require("del");

gulp.task("prepare", async function () {
  await del("lib/**");
  await del("es/**");
  await del("dist/**");
});

gulp.task("cjs", function () {
  return gulp.src(["./es/**/*.js"]).pipe(babel()).pipe(gulp.dest("lib/"));
});

gulp.task("es", function () {
  const tsProject = ts.createProject("tsconfig.pro.json", {
    module: "ESNext",
    target: "ES5"
  });
  return gulp
    .src(["src/**/*.ts", "src/**/*.tsx", "!src/**/demo/*"])
    .pipe(tsProject())
    .pipe(gulp.dest("es/"));
});

gulp.task("declaration", function () {
  const tsProject = ts.createProject("tsconfig.pro.json", {
    declaration: true,
    emitDeclarationOnly: true
  });
  return gulp
    .src(["src/**/*.ts", "src/**/*.tsx", "!src/**/demo/*"])
    .pipe(tsProject())
    .pipe(gulp.dest("es/"))
    .pipe(gulp.dest("lib/"));
});

exports.default = gulp.series("prepare", "es", "cjs", "declaration");
