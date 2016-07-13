Template.comment.helpers({
  submittedText: function() {
    var date = new Date(this.submitted).toString().split(' ');
    var day = date[2];
    var month = date[1];
    var year = date[3];
    return [day, month, year].join(' ');
  }
});
