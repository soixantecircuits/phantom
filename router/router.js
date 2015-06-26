'use strict';

Router.route('/', function(){
  this.render('login');
});

Router.route('/signup');
Router.route('/forgot');

Router.route('/dashboard', {
  template: 'dashboard',
  data: function(){
    if(Meteor.userId() == null){
      console.log('User is not connected. Redirecting to signin.');
      this.redirect('/');
    }else{
      var isValid = Meteor.users.findOne({_id: Meteor.userId()}).emails[0].verified;
      console.log(isValid);
      if(!isValid){
        Meteor.logout();
        this.redirect('/');
        Session.set('toasts', [{content: 'You need to validate your account.'}]);
      }
    }
  }
});
