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
  }
});