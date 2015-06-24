'use strict';

Router.route('/', function(){
  this.render('login');
});

Router.route('/signup');
Router.route('/thanks');
Router.route('/forgot');
Router.route('/newpassword');

Router.route('/dashboard', {
  template: 'dashboard',
  data: function(){
    if(Meteor.userId() == null){
      console.log('User is not connected. Redirecting to signin.');
      this.redirect('/');
    }
  }
});
