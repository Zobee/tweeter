$(document).ready(function() {
  let toTopBtn = $(".scroll-to-top-btn")
  toTopBtn.on("click", function(){
    $(window).scrollTop(0)
  })

  $(window).scroll(() => {
    let scrollLocation = $(window).scrollTop()
    scrollLocation > 50 ? toTopBtn.show(100) : toTopBtn.hide(100)
  })
}); 