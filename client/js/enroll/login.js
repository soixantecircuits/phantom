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
            console.error('Utilisateur introuvable');
          } else if(err.reason == 'Login forbidden'){
            console.error('Le compte n\'a pas encore été validé.');
          }
        } else {
          Router.go('/dashboard');
        }
      });
      return false;
    }
    for (var i = 0; i < logs.length; i++){
      cosole.log(logs[i]);
    }
  },
  'click #addToast': function(){
    Session.set('toasts', [{content: Math.random()}]);
  }
});