Template.dashboard.events({
  'click .js-new-entry': function (event) {
    Router.go('/new-entry');
  },
  'click .js-export': function (event) {
    Session.set('toasts', [{content: 'Export en cours...'}]);
    Meteor.call('exportProducts');
  },
  'click .js-get-export': function (event) {
    window.location = 'http://' + Meteor.settings.public.majordome.address + ':' + Meteor.settings.public.majordome.port + '/exports.zip/please', '_blank';
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