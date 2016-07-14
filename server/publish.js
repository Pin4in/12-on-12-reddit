// *************
// Publish Posts
// *************

Meteor.publish('posts', function() {
  return Posts.find();
});

// *************
// Publish Comments
// *************
Meteor.publish('comments', function(postId) {
  check(postId, String);
  return Comments.find({postId: postId});
});
