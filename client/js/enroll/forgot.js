Template.forgot.events({
  'submit #forgot-form': function(e) {
    e.preventDefault();
    var emailValue = $(e.target).find('[name="email"]').val().toLowerCase();
    Accounts.forgotPassword({email: emailValue}, function(err, res) {
      if(err){
        if (err.message === 'User not found [403]') {
          Session.set('toasts', [{content: 'This email does not exist.'}]);
        } else {
          Session.set('toasts', [{content: 'We are sorry but something went wrong.'}]);
        }
      }else{
        Session.set('toasts', [{content: 'Un mail vous a été envoyé'}]);
        Router.go('/');
      }
    });
  }
});