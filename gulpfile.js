let gulp = require('gulp');//引入gulp
let del = require('del');//引入删除文件
let imagemin = require('gulp-imagemin');
let pngquant = require('imagemin-pngquant');
let htmlmin = require('gulp-htmlmin');
let $ = require('gulp-load-plugins')();
let debug = require('gulp-debug');
let useref = require('gulp-useref');
let uglify = require('gulp-uglify');
let minifycss = require('gulp-minify-css');
let gulpif = require('gulp-if');
let autoprefixer = require('gulp-autoprefixer'); // 引入css样式自动加浏览器前缀功能
let express = require('express');
let router = express.Router();
var through = require('through2');
var fz = 41.4;
gulp.task('css', ()=>{
  // 编译css
  var sass = require('gulp-ruby-sass');
  var concat = require('gulp-concat');
   sass(['src/scss/**/*.scss'],{
      style: 'expanded',
      precision: 10
      })
  .on('error', console.error.bind(console))
  .pipe(gulp.dest('src/tmpstyles'))
  .pipe(gulp.dest('src/styles'))
  .pipe(gulp.dest('build/styles'));

  // 自动前缀
  return gulp.src('src/tmpstyles/**/*.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions','Android >= 4.0'],
      cascade: true,
      remove: true
    }))
    .pipe(gulp.dest('src/styles'))
    .pipe(gulp.dest('build/styles'));
});
// 压缩图片
gulp.task('mini',()=>{
  return gulp.src('src/images/**/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('build/images'));
})
// 合并routers中路由信息,处理假数据
gulp.task('concatRoutes',()=>{
  var concat = require('gulp-concat');
  gulp.src(['routers/a.js','routers/router/*.js','routers/b.js'])
    .pipe(concat('router.js'))
    .pipe(gulp.dest('routers'))
})
// 压缩css html
gulp.task('html',()=>{
  return gulp.src('src/index.html')
    .pipe(useref({searchPath: '{src,test}'}))
    .pipe(gulpif('*.css', minifycss()))
    // 输出路径在html中指定
    .pipe(debug())
    // js混淆交给webpack来做
    // .pipe(gulpif('*.js', uglify()))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build/'));
})

gulp.task('copyotherfile',()=>{
  return gulp.src('src/otherfiles/*')
    .pipe(gulp.dest('build/otherfiles/'));
})
gulp.task('public',['copyotherfile'],()=>{
  return gulp.src('src/index.html')
    .pipe(useref({searchPath:['src/styles','.']}))
    .pipe(gulpif('*.css', minifycss()))
    .pipe(gulpif('*.js', uglify().on('error', function(err) {
        gutil.log(gutil.colors.red('[Error]'), err.toString());
    })))
    // .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build/'));
})

// 生成雪碧图
gulp.task('spriter',()=>{
  const js_to_css =  function(obj) {
    let _decode = [];
    let _css = "";
    for (n in obj){
      _decode.push({selector: n, styles: obj[n], number_of_objs: 0})
    }
    while (_decode.length > 0) {
      var selector = _decode[0].selector;
      var styles = _decode[0].styles;
      _css += "\n\r"+ selector+" {";
      for (var n in styles) {
          if (styles.hasOwnProperty(n)) {
              if (typeof styles[n] === "string") {
                  _css += n + ": " + styles[n]+"; ";
              } else {
                  const _index = _decode[0].number_of_objs + 1;
                  _decode.splice(_index, 0, {selector: selector + " " + n, styles: styles[n], number_of_objs: 0})
                  _decode[0].number_of_objs++;
              }
          }
      }
      _css += "}  ";
      _decode.splice(0, 1);
    }
    return _css;
  }
  const spritesmith = require('gulp.spritesmith');
  // 分文件夹合并雪碧图
  return gulp.src('src/images/icons/**')
        .pipe(through.obj(function(file,enc,cb){
              if(file.relative && file.relative.indexOf('.')=='-1'){
                gulp.src('src/images/icons/'+file.relative+'/*.png')
                  .pipe(spritesmith({
                      imgName:'src/images/'+file.relative+'_sprite.png',  //保存合并后图片的地址
                      cssName:'src/scss/'+file.relative+'_sprite.scss',   //保存合并后对于css样式的地址
                      padding:20,
                      algorithm:'top-down',
                      cssTemplate:function(data){
                        var mobileSpriteObj = {};
                        var webSpriteObj = {};
                        data.sprites.forEach(function (sprite) {
                          var name = '.icon-'+sprite.name;
                          // 移动端rem布局的
                          let newMobileData = {
                            "display":"inline-block",
                            "background-image": 'url('+sprite["escaped_image"]+')',
                            "background-position":((sprite.px.offset_x.replace("px",''))/2/fz+'rem')+' '+((parseInt(sprite.px.offset_y.replace("px",''))+1)/2/fz+'rem'),
                            "background-size":(sprite.total_width / 2 /fz+"rem"),
                            "width":((parseInt(sprite.px.width.replace("px",''))+1)/2/fz+'rem'),
                            "height":((parseInt(sprite.px.height.replace("px",''))+2)/2/fz+'rem')
                          }
                          mobileSpriteObj[name] = newMobileData;
                          // web端px布局的
                          let newWebData = {
                            "display":"inline-block",
                            "background-image": 'url('+sprite["escaped_image"]+')',
                            "background-position":((sprite.px.offset_x.replace("px",''))/2+'px')+' '+((parseInt(sprite.px.offset_y.replace("px",''))+1)/2+'px'),
                            "background-size":(sprite.total_width / 2 +"px"),
                            "width":((parseInt(sprite.px.width.replace("px",''))+1)/2+'px'),
                            "height":((parseInt(sprite.px.height.replace("px",''))+2)/2+'px')
                          }
                          webSpriteObj[name] = newWebData;

                          delete sprite.name;
                        });
                        return js_to_css(webSpriteObj)
                              +'\n\r\n\r'+'@media screen and (max-width: 449px){'
                              +js_to_css(mobileSpriteObj)
                              +'\n\r}';
                      }
                  }))
                  .pipe(gulp.dest('.'));
              }
              this.push(file);
              cb();
          }));
        })
// 拷贝打包完成的目录到joywok项目中
gulp.task('copy', ()=>{
  gulp.src('build/**/*')
    .pipe(gulp.dest('./../dist'));
});

gulp.task('publish',['css','html','mini'],function(){
})
gulp.task('default',["spriter","css",'concatRoutes'],()=>{
  gulp.watch(['src/images/icons/**'],['spriter']);
  gulp.watch(['routers/router/**/**/*.js'],['concatRoutes']);
  gulp.watch(['src/scss/**/*.scss'],['css']);
});
