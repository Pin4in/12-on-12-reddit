Comments = new Mongo.Collection('comments');

Meteor.methods({
  submitComment: function(commentAttributes) {
    check(commentAttributes, {
      body: String,
      postId: String
    });

    var user = Meteor.user();
    var post = Posts.findOne(commentAttributes.postId);
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to make comments");
    if (!commentAttributes.body)
      throw new Meteor.Error(422, 'Please write some content');
    if (!post)
      throw new Meteor.Error(422, 'You must comment on a post');
    var comment = _.extend(_.pick(commentAttributes, 'postId', 'body'), {
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime()
    });
    Posts.update(comment.postId, {$inc: {commentsCount: 1}});

    return Comments.insert(comment);
  }
});
