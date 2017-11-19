function addFixedOnScroll(limit){
    console.log("bin hier: " + $(window).scrollTop());
    if ($(window).scrollTop() >= limit) {
       $('#a2 section').addClass('fixed');
    }
    else {
       $('#a2 section').removeClass('fixed');
    }
  };

$(document).ready(function(){
  var originalPosition = $('#a2 section').offset().top;
  console.log(originalPosition);

  addFixedOnScroll(originalPosition);

  $(window).scroll(function() {
    addFixedOnScroll(originalPosition);
  });

});
