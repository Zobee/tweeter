$(document).ready(function() {
  let toTopBtn = $(".scroll-to-top-btn")

  toTopBtn.on("click", function(){
    $(window).scrollTop(0)
  })

  $(window).scroll(() => {
    let scrollLocation = $(window).scrollTop()
    if(scrollLocation > 50){
      toTopBtn.show();
      $("nav").hide("slow");
    } else {
      toTopBtn.hide();
      $("nav").show("slow");
    }
  })
}); 