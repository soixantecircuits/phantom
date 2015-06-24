Template.toaster.helpers({
  'toasts': function () {
    return Session.get('toasts') || [];
  }
});