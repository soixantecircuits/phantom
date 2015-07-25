Meteor.methods({
  'exportProducts': function(){
    var cfsPath = '';
    if(Meteor.isDemeteorized){
      cfsPath = process.env.PWD + FS.HTTP.uploadUrl + '/images';
    } else {
      cfsPath = process.cwd().substr(0, process.cwd().indexOf('/build')) + FS.HTTP.uploadUrl + '/images';
    }
    console.log('export.js:9 - ', cfsPath);

    var entries = Entries.find({}, {sort: {createdAt: -1}}).fetch();
    var fs = Npm.require('fs');
    var archiver = Meteor.npmRequire('archiver');
    var base = process.env.PWD;
    var filename = base + '/public/exports/export.json';

    fs.writeFile(filename, JSON.stringify(entries, null, 2), function(err) {
      if(err){
        console.log(err);
      } else {
        console.log("JSON saved to " + filename);
        var zipArchive = archiver('zip');
        var publicDir = '';
        if(Meteor.isDemeteorized){
          publicDir = process.cwd().substr(0, process.cwd().indexOf('/server')) + '/web.browser/app/exports.zip';
        } else {
          publicDir = base + '/public/exports.zip';
        }
        var output = fs.createWriteStream(publicDir);
        output.on('close', function() {
          console.log('done with the zip');
        });
        zipArchive.pipe(output);
        zipArchive.directory(base + '/public/exports/', false);
        zipArchive.directory(cfsPath, 'images');
        zipArchive.finalize();
      }
    });
  }
});