
var t = new jake.TestTask('hairstrike', function () {
  this.testFiles.include('test/*.js');
  this.testFiles.include('test/**/*.js');
});

task('thumb', {async: true}, function () {
  var thumb = require('node-thumbnail').thumb;
  thumb({
    source: './public/img/pics',
    destination: './public/img/pics',
    width: 200,
    concurrency: 4
  },
  function () {
    console.dir(arguments);
    console.log('Done');
    complete();
  });
});

