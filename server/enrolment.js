Meteor.methods({
  'sendVerification': function(email){
    Accounts.sendVerificationEmail(Meteor.userId(), email);
  },
  'isUserValidated': function(){
    var user = Meteor.users.findOne({_id: Meteor.userId()});
    if(user){
      return false;
    }
    return user.emails[0].verified;
  }
});
