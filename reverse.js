
//includes a function called reverseGif which will return a reversed gif in the same folder as the file running it

var fs = require('fs');
var exec = require('child_process').exec;
var child;

module.exports.reverseGif = function(gifName) {

  //file has to exist to run
  if (!fs.existsSync(gifName)){
  	console.log('Could not find ' + gifName + ' Will stop current node process' );
  	process.exit();
  }

  var command = " convert " + gifName + " -coalesce -reverse \
          -quiet -layers OptimizePlus  -loop 0 " + gifName.split('.')[0] + "-reverse.gif";

  child = exec(command, function (error, stdout, stderr) {
  	console.log(stdout);
  	console.log(stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });

}