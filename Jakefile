

desc('Generates thumbnails for pics in the pics/ directory');
task('thumb', {async: true}, function () {
  var thumb = require('node-thumbnail').thumb;
  thumb({
    source: './public/img/pics',
    destination: './public/img/pics',
    width: 180,
    concurrency: 4
  },
  function () {
    console.dir(arguments);
    console.log('Done');
    complete();
  });
});

