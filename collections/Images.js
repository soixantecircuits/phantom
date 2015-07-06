Images = new FS.Collection("Images", {
  stores: [new FS.Store.FileSystem("images", {path: Meteor.settings.public.uploadPath})]
});

Images.allow({
  insert: function(userId, doc){
    return true;
  },
  update: function(userId, doc){
    return true;
  }
})