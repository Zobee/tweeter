$(document).ready(function() {
  const timeStamp = $(".tweet footer h5")
  timeStamp.text(timeago.format(Date.now()))
})