function getLanguage(language) {
  if (language.match(/fr/i)) {
    language = 'fr_FR';
  } else {
    language = 'en_US';
  }
  return language;
};

Meteor.startup(function() {
  var language;
  if (Meteor.isClient) {
    language = window.navigator.userLanguage || window.navigator.language;
    language = getLanguage(language);
    i18n.setLanguage(language);
  }
});