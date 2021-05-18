const CHARLIMIT = 140;

$(document).ready(function() {
  console.log("READY")
  $("#tweet-text").on("keydown", function(e) {
    const counter = $(this).siblings(".tweet-btn-container").children(".counter");
    const currChars = CHARLIMIT - $(this).val().length;
    currChars < 0 ? counter.text(currChars).addClass("red-text") : counter.text(currChars).removeClass("red-text")
  })
});