Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path:  "./uploads"})]
});

Images.allow({
  insert: function(userId, doc){
    return true;
  },
  update: function(userId, doc){
    if(doc.createdBy === userId || doc.createdBy == undefined){
      console.log('Images.js:11 - true');
      return true;
    }
    console.log('Images.js:14 - false');
    return false;
  }
})