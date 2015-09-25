//what does this file accomplish?
//file named in here that I will reverse
//if file doesn't exist, output message
//if output file exists, replace output

//will use one command to split up gif into frames (my own python program)
//another command to put those images together (pygifme)

var fs = require('fs');
var sys = require('sys');
var exec = require('child_process').exec;
var child;

//the gif I will reverse
var gifName = 'funny.gif';
var path = 'output';

var deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

var makeDirectory = function(_path){
	if (!fs.existsSync(_path)){
    	fs.mkdirSync(_path);
	}
};

//EXECUTING CODE BELOW

//file has to exist to run
if (!fs.existsSync(gifName)){
	console.log('Could not find ' + gifName + ' Will stop current node process' );
	process.exit();
}

//create blank output folder after these two lines
deleteFolderRecursive(path);
makeDirectory(path);


//run the python program which will reverse gif (takes gif name as an argument)

var command = "python reverse.py " + gifName;

child = exec(command, function (error, stdout, stderr) {
	console.log(stdout);
	console.log(stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});
