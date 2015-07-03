Images = new FS.Collection("Images", {
  stores: [new FS.Store.FileSystem("public", {path: Meteor.settings.public.uploadPath})]
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