$(document).ready(function() {
  $("#compose").on("click", function(e) {
    $(".new-tweet").toggle("slow", () => {
      $(".new-tweet").children("textarea").focus()
    })
  })
}); 