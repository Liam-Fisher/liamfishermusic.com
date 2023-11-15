$(document).ready(function(){
var winH = window.innerHeight;
var winW = window.innerWidth;
$(window).on("resize", function() {
var metric = (winH/120);
var height1 = metric*20;
var height2 = metric *85;
var height3 = metric*15;
$("header").css("height", height1+"px");	
$("header").css("width", "100%");
$("main").css("height", height2+"px");	
$("main").css("width", "100%");
$("footer").css("height", height3+"px");	
$("footer").css("width", "100%");
if (winH>winW){
    $("#informationHeader").css("margin-bottom", (height3*2)+'px');
}
$("#videoPlayer").animate({opacity: 0.75}, 5000);
if (winW<1000){
    if(winH>winW){
    $("#videoPlayer").attr('height', (winW/(4*winH))*winH);
    
    $("#videoContainer").css({
            height: (winW/(4*winH))*winH
     });
     $("#videoContainerA").css({
        height: (winW/(2*winH))*winH
 });
    }
    $("#videoPlayer").attr('width', (winW*0.9));
    $("#videoContainer").css({
        width: winW*0.89999
    });
    
    var font = ((winW/750)+1.25)+'em';
    if (winH<750) {
    var lineHeight = ((winH/750)+1)+'em';
    $("#informationHeader").css("line-height", lineHeight);
    }
    $("#informationHeader").css("font-size", font);
}
else {
$("#videoPlayer").attr('width', (winW/2)+250);
$("#videoContainer").css({
width: winW/2+250
}
    
)

}});
$(window).trigger("resize");
console.log(winW, winH);
})