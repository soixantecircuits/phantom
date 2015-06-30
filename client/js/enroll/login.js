Template.login.events({
  'submit #login-form': function(e, t) {
    e.preventDefault();

    var user = $(e.target).find('[name="login-id"]').val();
    var pass = $(e.target).find('[name="login-password"]').val();
    var logs = '';
    // If validation passes, supply the appropriate fields to the
    // Meteor.loginWithPassword() function.

    if(!user.length){
      logs += 'No email provided';
    }
    if(!pass.length){
      logs += 'No password provided';
    }

    if(logs == '') {
      Meteor.loginWithPassword(user, pass, function(err, res) {
        if(err) {
          if(err.reason == 'User not found'){
            console.log('Utilisateur introuvable');
            Session.set('toasts', [{content: 'Utilisateur introuvable'}]);
          } else if(err.reason == 'Login forbidden'){
            console.log('Le compte n\'a pas encore été validé.');
            Session.set('toasts', [{content: 'Le compte n\'a pas encore été validé.'}]);
          } else if(err.reason == 'Incorrect password'){
            console.log('Mot de passe incorrect');
            Session.set('toasts', [{content: 'Mot de passe incorrect'}]);
          }
        } else {
          Router.go('/dashboard');
        }
      });
      return false;
    } else {
      console.log(logs);
      Session.set('toasts', [{content: logs}]);
      Router.go('/');
    }
  },
});