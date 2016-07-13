Template.postPage.helpers({
  ownPost: function() {
    return this.userId == Meteor.userId();
  }
});
