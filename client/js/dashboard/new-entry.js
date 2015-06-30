Template.newEntry.events({
  'submit #entry-form': function (event) {
    event.preventDefault();

    var title = $(event.target).find('[name="entry-title"]').val();
    var desc = $(event.target).find('[name="entry-description"]').val();
    var logs = '';

    if(!title.length){
      logs = 'No title provided.';
    }
    if(!desc.length && !logs.length){
      logs = 'No description provided.';
    }

    if(!logs.length){
      // See https://gist.github.com/mathewbyrne/1280286
      var slug = title.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');

      Entries.insert({
        createdBy: Meteor.userId(),
        createdAt: new Date(),
        title: title,
        content: desc,
        slug: slug
      });
    } else {
      console.log(logs);
      Session.set('toasts', [{content: logs}]);
    }

    return false;
  }
});