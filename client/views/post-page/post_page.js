Template.postPage.helpers({
  ownPost: function() {
    return this.userId == Meteor.userId();
  },
  comments: function() {
    return Comments.find({postId: this._id});
  },
  commentsCount: function() {
    return Comments.find({postId: this._id}).count();
  }
});
