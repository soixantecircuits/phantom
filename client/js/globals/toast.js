Template.toaster.helpers({
  'resetToastsTimer': null,
  'toasts': function () {
    clearTimeout(this.resetToastsTimer);
    this.resetToastsTimer = setTimeout(function() {
      console.log('reset toasts');
      Session.set('toasts', []);
      return Session.get('toasts');
    }, 1000);
    return Session.get('toasts') || [];
  }
});

UI.registerHelper('resetToasts', function(){
});