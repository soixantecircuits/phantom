Template.toaster.helpers({
  'toasts': function () {
    // TODO: store timeout to clear it
    // TODO: check why this event is triggered twice
    setTimeout(function() {
      $('.toast-container').fadeOut();
      console.log('reset toasts');
      Session.set('toasts', []);
      return Session.get('toasts');
    }, 5000);
    $('.toast-container').fadeIn();
    return Session.get('toasts') || [];
  }
});
