Meteor.methods({
  'exportProducts': function(){
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
        var output = fs.createWriteStream(base + '/public/exports.zip');
        var zipArchive = archiver('zip');
        output.on('close', function() {
            console.log('done with the zip');
        });
        zipArchive.pipe(output);
        zipArchive.directory(base + '/public/exports/', false);
        zipArchive.finalize(function (err, bytes) {
            if(err) {
              throw err;
            }
            console.log('done:', base, bytes);
        });
      }
    });
  }
});