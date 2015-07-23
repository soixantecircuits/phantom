
Meteor.call('getUploadPath', function(err, data){
	var path = data;
	if(path == undefined && Meteor.isServer){
		path = process.env.PWD + '/public' + Meteor.settings.public.uploadPath;
	}
	Images = new FS.Collection("Images", {
	  stores: [new FS.Store.FileSystem("images", {path: path})]
	});
	Images.allow({
	  insert: function(userId, doc){
	    return true;
	  },
	  update: function(userId, doc){
	    return true;
	  },
	  remove: function(userId, doc){
	  	return true;
	  }
	});
});
