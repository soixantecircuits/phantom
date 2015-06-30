Meteor.methods({
  'sendVerification': function(email){
    Accounts.sendVerificationEmail(Meteor.userId(), email);
  }
});
