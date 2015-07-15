Template.edit.helpers({
  entry: function () {
    return Entries.findOne({slug: Session.get('currentSlug')});
  }
});

Template.edit.events({
  "submit #edit-form": function (event) {
    event.preventDefault();

    var title = $(event.target).find('[name="entry-title"]').val();
    var desc = $(event.target).find('[name="entry-description"]').val();
    var capacity = $(event.target).find('[name="entry-description"]').val();
    var also = $(event.target).find('[name="entry-also"]').val();
    var extras = $(event.target).find('[name="entry-extras"]').val();
    var logs = '';

    if(!title.length){
      logs = 'No title provided.';
    }
    if(!desc.length && !logs.length){
      logs = 'No description provided.';
    }
    if(!capacity.length && !logs.length){
      logs = 'No capacity provided';
    }

    if(!logs.length){
      // See https://gist.github.com/mathewbyrne/1280286
      var slug = title.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');

      Entries.update({
        _id: Entries.findOne({slug: Session.get('currentSlug')})._id
      }, {
        $set: {
          title: title,
          content: desc,
          capacity: capacity,
          also: also,
          extras: extras,
          slug: slug
        }
      }, function(err, response){
        if(err){
          console.log('Error: ',err);
        } else {
          Router.go('/');
        }
      });
    } else {
      console.log(logs);
      Session.set('toasts', [{content: logs}]);
    }



    // Entries.findOne({slug: Session.get('currentSlug')}, function(err, data){
    //   console.log(data);
    // });
    return false;
  }
});