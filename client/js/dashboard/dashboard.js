Template.dashboard.events({
  'click .js-new-entry': function (event) {
    Router.go('/new-entry');
  }
});

Template.dashboard.helpers({
  entries: function () {
    return Entries.find({}, {sort: {createdAt: -1}}).fetch();
  }
});