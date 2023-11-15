$(document).ready(function(){
  var winH = window.innerHeight;
  var winW = window.innerWidth;
  $(window).on("resize", function() {
    if(winH>winW) $("#compUI").attr("src", "compUIB.html");
      else $("#compUI").attr("src", "compUIA.html");
  });
  $(window).trigger("resize");
});