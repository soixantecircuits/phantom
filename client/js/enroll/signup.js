Template.signup.events({
  'submit #signup-form': function(e, t) {
    e.preventDefault();
    $(e.target).find('.alert-form').remove();
    var user = $(e.target).find('[name="signup-email"]').val();
    var pass = $(e.target).find('[name="signup-password"]').val();
    var confirm = $(e.target).find('[name="signup-password-confirm"]').val();
    var logs = '';

    if (!user.length){
      logs += 'Renseignez votre email';
    }
    if (!pass.length){
      logs += (logs == '' ? 'Renseignez votre mot de passe' : ', votre mot de passe ');
    }
    if (!confirm.length){
      logs += (logs == '' ? 'Confirmez votre mot de passe' : ' et confirmez votre mot de passe ');
    }

    if(logs.length){
      console.log(logs);
      Session.set('toasts', [{content: logs}]);
    } else {
      var account = {
        username: '',
        email: user,
        password: pass,
        profile: {
          first_name: '',
          last_name: '',
          username: '',
          email: user,
        }
      };
      console.log(account);
      Accounts.createUser(account, function(err) {
        if(err){
          console.log(err);
          // TODO: Display nice message instead of raw error
          Session.set('toasts', [{content: err}]);
        }else{
          console.log('success');
          Router.go('/dashboard');
        }
      });
    }
  },
});



