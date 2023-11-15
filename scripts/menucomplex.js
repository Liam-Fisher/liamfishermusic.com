$(document).ready(function(){
    var winH = window.innerHeight;
    var winW = window.innerWidth;
    $(window).resize(function(){
    let wB, hB, h4H, h4W, h5H, h5W;

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
    $("h4").html("");
    $("h5").html("");
  }

      else {    
        for (let i = 1; i<5; i++) {
          let id = "#button"+i+" img";
          $(id).css('display', 'none');
        } 
      h4H = (winH/96);
      h4W = (winW/24);
      let h4f = Number($("h4").css("font-size").slice(0, (this.length-3)));  
      
      h5H = h4H+(h4f*0.7);
      h5W = h4W+(h4f*0.8);      
      if(winW<1200) {
      wB = Math.ceil((winW/4.5));
      }
      else {
      wB = Math.ceil((winW/6));
      }
      hB = wB/3.25;

  $("header").hover(function() {
    $("h4").stop(); 
    $("h5").stop(); 
    $("#menuB").stop();
    $("#menuB").animate({"font-size": "2em"}, {duration: 350, queue: false});
    $("#menuA").stop();
    $("#menuA").animate({"font-size": "2em"}, {duration: 400, queue: false});
    $("h4").animate({opacity: 0}, {duration: 300, queue: false});
    $("h5").animate({opacity: 0}, {duration: 300, queue: false});
    window.setTimeout(navBar, 100);
    function navBar() {
    for (let i = 1; i<5; i++) {
      let id = "#button"+i;
        $(id).stop();
        $(id).animate({opacity: 1}, {duration: (i*150), queue: false});
    }
  }
  },
  function() {
      window.setTimeout(title, 400);
      for (let i = 1; i<5; i++) {
        let id = "#button"+i;
          $(id).stop();
          $(id).animate({opacity: 0}, {duration: 1000-(i*200), queue: false});
      }
      function title() {
        $("h4").stop(); 
        $("h5").stop();  
        $("#menuB").stop();
        $("#menuB").animate({"font-size": "4em"}, {duration: 400, queue: false});
        $("#menuA").stop();
        $("#menuA").animate({"font-size": "4em"}, {duration: 350, queue: false});
        $("h4").animate({opacity: 0.75}, {duration: 300, queue: false});
        $("h5").animate({opacity: 1}, {duration: 300, queue: false});
      }
  });
 
 }
 for (let i = 1; i<5; i++) {
  let id = "#button"+i;
 $(id).css({
  width: wB+'px',
  height: hB +'px',
 "font-size": (wB/8)+'px'
});
 };
 $("#menus").css({
  top: (h4H+'px'), 
  left: (h4W+'px'),
  height:(h4H*12)+'px',
  width: (h4W*2.5)+'px'
      });
      /*
    $("h5").css({
    top: (h5H+'px'),
    left: (h5W+'px')
});*/
});
$(window).trigger("resize");
})  