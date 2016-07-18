Posts = new Mongo.Collection('posts');

Posts.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    // разрешаем редактировать только следующие два поля:
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String
    });

    var postWithSameLink = Posts.findOne({url: postAttributes.url});
    if (postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id
      }
    }

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date(),
      upvoters: [],
      votes: 0
    });

    var postId = Posts.insert(post);
    return {
      _id: postId
    };
  },

  upvote: function(postId) {
    check(Meteor.userId(), String);
    check(postId, String);
    var user = Meteor.user();
    // удостоверимся, что пользователь залогинен
    if (!user)
      throw new Meteor.Error(401, "Надо залогиниться чтобы голосовать");
    var post = Posts.findOne(postId);
    if (!post)
      throw new Meteor.Error(422, 'Пост не найден');
    if (_.include(post.upvoters, user._id))
      throw new Meteor.Error(422, 'Вы уже голосовали за этот пост');
    Posts.update(post._id, {
      $addToSet: {upvoters: user._id},
      $inc: {votes: 1}
    });
  },


  downvote: function(postId) {
    check(Meteor.userId(), String);
    check(postId, String);
    var user = Meteor.user();
    // удостоверимся, что пользователь залогинен
    if (!user)
      throw new Meteor.Error(401, "Надо залогиниться чтобы голосовать");
    var post = Posts.findOne(postId);
    if (!post)
      throw new Meteor.Error(422, 'Пост не найден');
    if (_.include(post.upvoters, user._id))
      Posts.update(post._id, {
        $pull: {upvoters: user._id},
        $inc: {votes: -1}
      });
  }
});
