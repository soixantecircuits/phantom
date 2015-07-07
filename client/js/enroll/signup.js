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
    if(validator.isEmail(user)){
      logs += (logs == '' ? 'Renseignez un email valide' : '');
    }
    if(pass.length < 6){
      logs += (logs == '' ? 'Renseignez votre mot de passe' : ', votre mot de passe ');
    }
    if(confirm !== pass){
      logs += (logs == '' ? 'Confirmez votre mot de passe.' : ' et confirmez votre mot de passe.');
    }

    if(logs.length){
      console.log(logs);
      Session.set('toasts', [{content: logs}]);
    } else {
      var account = {
        username: '',
        email: user.toLowerCase(),
        password: pass,
        profile: {
          first_name: '',
          last_name: '',
          username: '',
          email: user.toLowerCase(),
        }
      };
      console.log(account);
      Accounts.createUser(account, function(err) {
        if(err){
          console.log(err);
          // TODO: Display nice message instead of raw error
          Session.set('toasts', [{content: err.reason}]);
        }else{
          Meteor.call('sendVerification', account.email);
          Meteor.logout();
          console.log('success');
          Session.set('toasts', [{content: 'Un email de verification vous a été envoyé.'}]);
          Router.go('/');
        }
        return false;
      });
    }
  },
});



