$(document).ready(function(){
    var winH = window.innerHeight;
    var winW = window.innerWidth;
    $(window).on("resize", function() {
      var metric = (winH/120);
      var height1 = metric*20;
      var height2 = metric*80;
      var height3 = metric*10;
      $("header").css("height", height1+"px");	
      $("header").css("width", "100%");
      $("main").css("width", "100%");
      $("section").css("width", "100%");
    });
    $(window).trigger("resize");
  });