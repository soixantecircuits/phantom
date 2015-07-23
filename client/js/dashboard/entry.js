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
  },
  'click .js-delete': function (event) {
  	var entry = Entries.findOne({slug: Session.get('currentSlug')});
  	Entries.remove(entry._id);
  	Session.set('toasts', [{content: entry.title+' has been removed'}]);
  	Router.go('/dashboard');
  }
});