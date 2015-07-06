// See https://github.com/meteor/meteor/issues/490#issuecomment-38050659
/*
 * A settings option to disable auto reload during development.
 */
Meteor.startup(function() {
  if (Meteor.settings && Meteor.settings.public && Meteor.settings.public.DISABLE_AUTO_RELOAD) {
    Meteor._reload.onMigrate(function(reloadFunction) {
      return [false];
    });
  }
});