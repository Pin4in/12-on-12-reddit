Template.commentSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $body = $(e.target).find('[name=body]');
    var comment = {
      body: $body.val(),
      postId: template.data._id
    };

    Meteor.call('submitComment', comment, function(error, commentId) {
      if (error) {
        return alert(error.reason);
      } else {
        $body.val('');
      }
    });
  }
});
