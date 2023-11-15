$(document).ready(function(){
    var winH = window.innerHeight;
    var winW = window.innerWidth;
    $("body").css("height", (winH*3)+'px');
    $(window).on("resize", function() {
      var metric = (winH/120);
      var height1 = metric*20;
      var height2 = metric *95;
      var height3 = metric*5;
      $("header").css("height", height1+"px");	
      $("header").css("width", "100%");
        var src = "../media/selfies/thinkingPic";
        var srcA, srcB;
      if(winW>1200){
        srcA = src+400;
        srcB = src+'Edit400';
        
      $("h2").css("text-indent", "5em");
      $("main").css({
        "height": height2+"px",
        "font-size": (Math.sqrt(winW/10)+10)+'px'});
      }
      else if (winW>800){
        srcA = src+300;
        srcB = src+'Edit300';
        
      $("h2").css("text-indent", "2.5em");
      $("main").css({
        "height": height2+"px",
        "font-size": (Math.sqrt(winW/30)+10)+'px'});
        }
      else if (winW>500){
        srcA = src+200;
        srcB = src+'Edit200';

        $("h2").css("text-indent", "1.25em");
      $("main").css({
        
        "height": height2+"px",
        "font-size": (Math.sqrt(winW/50)+10)+'px'});
        }
      else {
      srcA = src+100;
      srcB = src+'Edit100';
      $("h2").css("text-indent", "0.25em");
      $("main").css({
        "height": height2+"px",
        "font-size": (Math.sqrt(winW/100)+10)+'px'});
      }
      
      $("#thinkA").attr("src", (srcA+'.jpg'));
      $("#thinkB").attr("src", (srcB+'.jpg'));
      $("table").css({
        "border-spacing": Math.floor(winW/50)+'%'
      })
      $("footer").css("height", height3+"px");	
      $("footer").css("width", "100%");
    });
    
    $(window).trigger("resize");
    
});