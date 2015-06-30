Entries = new Meteor.Collection('entries');

Entries.allow({
  insert: function (userId, doc) {
    if(Entries.findOne({title: doc.title})){
      console.log('Entry.js:8 - Entry already exists (i.e, another entry had the title "' + doc.title + '").');
      return false;
    } else {
      console.log('Entry.js:11 - Entry "' + doc.title + '" has been inserted');
      return true;
    }
  },
  update: function (userId, doc, fieldNames, modifier) {
    if(doc.createdBy === userId){
      return true;
    }
    return false;
  }
});
