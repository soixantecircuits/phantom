Template.entry.helpers({
  'entry': function(){
    return Entries.findOne({slug: Session.get('currentSlug')});
  },
  imgFolder: function(){
  	return Meteor.settings.public.relativePath;
  }
}),

Template.entry.events({
  'click .js-edit': function (event) {
    Router.go('/edit/' + Session.get('currentSlug'));
  }
});