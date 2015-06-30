Meteor.methods({
  'sendVerification': function(email){
    Accounts.sendVerificationEmail(Meteor.userId(), email);
  }
});

Accounts.validateLoginAttempt(function(attempt){
  if (attempt.user && attempt.user.emails && !attempt.user.emails[0].verified ) {
    console.log('email not verified');

    return false; // the login is aborted
  }
  return true;
});
