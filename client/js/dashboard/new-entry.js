Template.newEntry.events({
  'submit #entry-form': function (event) {
    event.preventDefault();

    var title = $(event.target).find('[name="entry-title"]').val();
    var desc = $(event.target).find('[name="entry-description"]').val();
    var capacity = $(event.target).find('[name="entry-capacity"]').val();
    var extras = $(event.target).find('[name="entry-extras"]').val();
    var also = $(event.target).find('[name="entry-also"]').val();
    var file = $(event.target).find('[name="entry-image"]').prop('files')[0];
    var logs = '';

    if(!title.length){
      logs = 'No title provided.';
    }
    if(!desc.length && !logs.length){
      logs = 'No description provided.';
    }
    if(file == undefined && !logs.length){
      logs = 'No picture provided.';
    }

    if(!logs.length){
      // See https://gist.github.com/mathewbyrne/1280286
      var slug = title.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
      Images.insert(file, function (err, fileObj) {
        if(err){
          console.log(err);
          return;
        }
        // We need to wait until the copie is created
        setTimeout(function() {
          Entries.insert({
            createdBy: Meteor.userId(),
            createdAt: new Date(),
            title: title,
            content: desc,
            also: also,
            extras: extras,
            capacity: capacity,
            slug: slug,
            image: Images.findOne({_id: fileObj._id}).copies.images.key
          }, function(err){
            if(err){
              console.log(err);
            } else {
              window.location = '/dashboard';
            }
          });
        }, 500);
      });
    } else {
      console.log(logs);
      Session.set('toasts', [{content: logs}]);
    }

    return false;
  }
});