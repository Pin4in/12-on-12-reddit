Meteor.subscribe('posts');

Template.postsList.helpers({

  posts: () => {
      return Posts.find();
  }

});
