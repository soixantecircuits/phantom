Template.logout.events({
  'click #logout': function() {
    Meteor.logout();
    Router.go('/');
    $(document).ready(function(){
      i18n.init({ lng: 'en-EN', load: 'current', fallbackLng: false }, function(t) {
        $('[data-i18n]').i18n();
      });
    });
  }
});