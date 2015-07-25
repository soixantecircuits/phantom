Template.entry.helpers({
  'entry': function(){
    return Entries.findOne({slug: Session.get('currentSlug')});
  },
  getImagePath: function(imageID){
    var image = Images.findOne({_id: imageID});
    path = image.copies.images.key.replace(/-/g, '/');
    return path;
  }
}),

Template.entry.events({
  'click .js-edit': function (event) {
    Router.go('/edit/' + Session.get('currentSlug'));
  },
  'click .js-delete': function (event) {
    var entry = Entries.findOne({slug: Session.get('currentSlug')});
    console.log(entry);
    Entries.remove(entry._id);
    Images.remove(entry.imageId);
    Session.set('toasts', [{content: entry.title+' has been removed'}]);
    Router.go('/dashboard');
  }
});