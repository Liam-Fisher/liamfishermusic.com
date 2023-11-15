$(document).ready(function(){
    var winH = window.innerHeight;
    var winW = window.innerWidth;
    $(window).resize(function(){
    let wB, hB;

    if (winW<1000) {
      if (winW<750){
      $("button p").html("");
      wB = 80 + Math.floor(winW/75);
      hB = wB;
    }
    else {
      wB = Math.ceil((winW/5));
      for (let i = 1; i<5; i++) {
        let id = "#button"+i+" img";
        $(id).css('display', 'none');
      } 
    }
    $("button").css("opacity", 1);
  }

      else {    
        for (let i = 1; i<5; i++) {
          let id = "#button"+i+" img";
          $(id).css('display', 'none');
        } 
           
      if(winW<1200) {
      wB = Math.ceil((winW/4.5));
      }
      else {
      wB = Math.ceil((winW/6));
      }
      hB = wB/3.25;
 
 }
 for (let i = 1; i<5; i++) {
  let id = "#button"+i;
 $(id).css({
  width: wB+'px',
  height: hB +'px',
 "font-size": (wB/8)+'px'
});
 };
});
$(window).trigger("resize");
})  