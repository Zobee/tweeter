const CHARLIMIT = 140;

$(document).ready(function() {
  $("#tweet-text").on("keyup", function(e) {
    const counter = $(this).siblings(".tweet-btn-container").children(".counter");
    const currChars = CHARLIMIT - $(this).val().length;
    currChars < 0 ? counter.text(currChars).addClass("red-text") : counter.text(currChars).removeClass("red-text")
  })
});