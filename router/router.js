'use strict';

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

Router.route('/dashboard', function(){
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
    this.render('/dashboard');
  });

Router.route('/new-entry');

Router.route('/entry/:slug', {
  template: 'entry',
  data: function(){
    Session.set('currentSlug', this.params.slug);
  }
});

Router.route('/edit/:slug', {
  template: 'edit',
  data: function(){
    Session.set('currentSlug', this.params.slug);
  }
});
