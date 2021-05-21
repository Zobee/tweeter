$(document).ready(function() {
  let toTopBtn = $(".scroll-to-top-btn");

  toTopBtn.on("click", function() {
    $("html").animate({scrollTop: 0}, 500);
  });

  $(window).scroll(() => {
    let scrollLocation = $(window).scrollTop();
    if (scrollLocation > 150) {
      toTopBtn.show(150);
      $("nav").hide();
    } else {
      toTopBtn.hide(150);
      $("nav").show();
    }
  });
}); 