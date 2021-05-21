$(document).ready(function() {
  $("#compose").on("click", function() {
    $(".new-tweet").toggle("slow", () => {
      $(".new-tweet textarea").focus();
    });
  });
});