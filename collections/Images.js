Images = new FS.Collection("Images", {
  stores: [new FS.Store.FileSystem("images")]
});

Images.allow({
  insert: function(userId, doc){
    return true;
  },
  update: function(userId, doc){
    return true;
  },
  remove: function(userId, doc){
    return true;
  },
  download: function(userId, doc){
    return true;
  }
});
