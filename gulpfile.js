"use strict";
var gulp = require("gulp");
var del = require("del");
var sourcemaps = require('gulp-sourcemaps');

/**
 * Remove build directory.
 */
gulp.task('clean', function (cb) {
    return del(["build"], cb);
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", ["server"], function () {
    return gulp.src(["src/**/*", "!**/*.ts", "!src/server", "!src/server/**"])
        .pipe(gulp.dest("build"));
});
gulp.task("server", function () {
    return gulp.src(["index.js", "package.json"], { cwd: "src/server/**" })
        .pipe(gulp.dest("build"));
});
/**
 * Copy all required libraries into build directory.
 */
// gulp.task("libs", function () {
//     return gulp.src([
//         'es6-shim/es6-shim.min.js',
//         'systemjs/dist/system-polyfills.js',
//         'angular2/bundles/angular2-polyfills.js',
//         'angular2/es6/dev/src/testing/shims_for_IE.js',
//         'systemjs/dist/system.src.js',
//         'rxjs/bundles/Rx.js',
//         'angular2/bundles/angular2.dev.js',
//         'angular2/bundles/router.dev.js'
//     ], { cwd: "node_modules/**" }) /* Glob required here. */
//         .pipe(gulp.dest("build/lib"));
// });
gulp.task("libs", function () {
    return gulp.src([
        'core-js/client/shim.min.js',
        'zone.js/dist/zone.js',
        'reflect-metadata/Reflect.js',
        'systemjs/dist/system.src.js',
        //'@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.js',
        //'@angular/core/bundles/core.js'

        // '@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        // '@angular/common/bundles/common.umd.js',
        // '@angular/core/bundles/core.umd.js',
        // '@angular/compiler/bundles/compiler.umd.js'
        '@angular/*/bundles/*.umd.js',
        'rxjs/**/*.js'
    ], { cwd: "node_modules/**" }) /* Glob required here. */
        .pipe(gulp.dest("build/lib"));
});

/**
 * Build the project.
 */
gulp.task("default", ['resources', 'libs'], function () {
    console.log("Building the project ...");
});