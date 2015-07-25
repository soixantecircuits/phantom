Template.dashboard.events({
  'click .js-new-entry': function (event) {
    Router.go('/new-entry');
  },
  'click .js-export': function (event) {
    Meteor.call('exportProducts', function(){
      window.location = '/exports.zip', '_blank';
    });
  }
});

Template.dashboard.helpers({
  entries: function () {
    return Entries.find({}, {sort: {createdAt: -1}}).fetch();
  },
  getImagePath: function(imageID){
    var image = Images.findOne({_id: imageID});
    path = image.copies.images.key.replace(/-/g, '/');
    return path;
  }
});