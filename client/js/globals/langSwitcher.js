Template.langSwitcher.events({
  'click #lang > a.fr': function() {
    i18n.setLanguage('fr_FR');
  },
  'click #lang > a.en': function() {
    i18n.setLanguage('en_US');
  }
});