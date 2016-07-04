// *************
// Publish Posts
// *************

Meteor.publish('posts', function() {
  return Posts.find();
});
