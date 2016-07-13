// *************
// Publish Posts
// *************

Meteor.publish('posts', function() {
  return Posts.find();
});

// *************
// Publish Comments
// *************
Meteor.publish('comments', function() {
  return Comments.find();
});
