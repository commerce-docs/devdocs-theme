
var fs = require('fs');
var uglify = require("uglify-js");

var jsDir = '_js/';
var jsDest = 'assets/js/';

//var source_map = uglify.SourceMap(source_map_options);

var uglified = uglify.minify([
  jsDir + '_vendor/*',
  jsDir + '_includes/*',
  jsDir + 'app.js'
],{
  outSourceMap: "app.min.js.map"
});

fs.writeFile(jsDest + 'app.min.js', uglified.code, function (err){
  if(err) {
    console.log(err);
  } else {
    console.log("Script generated and saved:", 'app.min.js');
  }
});

fs.writeFile(jsDest + 'app.min.js.map', uglified.map, function (err){
  if(err) {
    console.log(err);
  } else {
    console.log("SourceMap generated and saved:", 'app.min.js.map');
  }
});
