Template.toaster.helpers({
  'toasts': function () {
    // TODO: store timeout to clear it
    setTimeout(function() {
      console.log('reset toasts');
      Session.set('toasts', []);
      return Session.get('toasts');
    }, 5000);
    return Session.get('toasts') || [];
  }
});
