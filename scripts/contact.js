$(document).ready(function(){
  var winH = window.innerHeight;
  var winW = window.innerWidth;
  $(window).on("resize", function() {
    var metric = (winH/120);
    var height1 = metric*20;
    var height2 = metric *95;
    var height3 = metric*5;
    $("header").css("height", height1+"px");	
    $("header").css("width", "100%");
    $("main").css({
      "height": height2+"px",
      "font-size": ((winW/100) + 10) +'px'});
    $("main").css("width", "100%");
    $("table").css({
      "border-spacing": Math.floor(winW/50)+'%',
      "height": ((10*winW/winH)+40)+'%'
    })
    $("footer").css("height", height3+"px");	
    $("footer").css("width", "100%");
  });
  
  $(window).trigger("resize");
});