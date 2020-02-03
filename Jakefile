let { execSync, spawn } = require('child_process');
let pages = [
  '/',
  'band.html',
  'music.html',
  'setlist.html',
  'fans.html',
  'contact.html'
];

task('generate', async function () {
  return new Promise((resolve, reject) => {
    let child = spawn('./node_modules/.bin/geddy', {
      stdio: 'inherit'
    });
    child.on('exit', () => {
      resolve();
    });
    execSync('rm -rf ./public/*.html');
    process.chdir('./public');
    pages.forEach((item) => {
      let out = execSync(`wget http://localhost:4000/${item}`).toString();
      console.log(out);
    });
    child.kill();
  });
});
