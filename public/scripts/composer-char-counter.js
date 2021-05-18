const CHARLIMIT = 140;

$(document).ready(function() {
  console.log("READY")
  $("#tweet-text").on("keyup", function(e) {
    const counter = $(this).siblings(".tweet-btn-container").children(".counter");
    const currChars = CHARLIMIT - $(this).val().length;
    let colorClass = currChars < 0 ? "red-text" : "";
    counter.text(currChars).addClass(colorClass);
  })
});