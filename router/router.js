'use strict';

Iron.Router.hooks.checkIfLogged = function(){
  if(Meteor.userId() == null){
    console.log('User is not connected. Redirecting to signin.');
    this.redirect('/');
  } else {
    if(Meteor.call('isUserValidated')){
      Meteor.logout();
      this.redirect('/');
      Session.set('toasts', [{content: 'You need to validate your account.'}]);
    }
  }
  this.next();
};

Router.onBeforeAction('checkIfLogged', {
  only: ['dashboard', 'entry.slug', 'edit.slug', 'new.entry']
});

Router.route('/', function(){
  if(Meteor.userId() !== null){
    this.render('/dashboard');
    return;
  }
  if (Accounts._verifyEmailToken) {
    var self = this;
    this.next();
    Accounts.verifyEmail(Accounts._verifyEmailToken, function(err) {
      if (err != null) {
        if (err.message = 'Verify email link expired [403]') {
          Session.set('toasts', [{content: 'Sorry this verification link has expired.'}]);
          // lame ...
          window.location = '/';
        } else {
          window.location = '/';
        }
      } else {
        Session.set('toasts', [{content: 'Thank you! Your email address has been confirmed.'}]);
        this.render('/dashboard');
      }
    });
  } else {
    this.render('login');
  }
});

Router.route('/signup');
Router.route('/forgot');

Router.route('/dashboard', {
  name: 'dashboard',
});

Router.route('/new-entry', {
  name: 'new.entry',
});

Router.route('/entry/:slug', {
  name: 'entry.slug',
  template: 'entry',
  data: function(){
    Session.set('currentSlug', this.params.slug);
  }
});

Router.route('/edit/:slug', {
  name: 'edit.slug',
  template: 'edit',
  data: function(){
    Session.set('currentSlug', this.params.slug);
  }
});
