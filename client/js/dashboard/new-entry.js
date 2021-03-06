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
        // We need to wait to make sure the image is stored
        setTimeout(function() {
          Entries.insert({
            createdBy: Meteor.userId(),
            createdAt: new Date(),
            title: xssFilters.inHTMLData(title),
            content: xssFilters.inHTMLData(desc),
            also: xssFilters.inHTMLData(also),
            extras: xssFilters.inHTMLData(extras),
            capacity: xssFilters.inHTMLData(capacity),
            slug: xssFilters.inHTMLData(slug),
            image: Images.findOne({_id: fileObj._id}).copies.images.key,
            imageID: fileObj._id
          }, function(err){
            if(err){
              console.log(err);
              Session.set('toasts', [{content: err}]);
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