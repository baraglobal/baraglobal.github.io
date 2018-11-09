$(document).ready(function(){

  $('body').imagesLoaded()
    .done( function( instance ) {
      $('.preloader').fadeOut(400);
    });

  $(function () {
      $('#ruler-inner-right').marquee({
       duration: 5000,
       delayBeforeStart: 0,
       duplicated: true,
       gap: 0,
       direction: 'up'
      });
  });

  var date = new Date;
  var month = date.getMonth()+1;
  var day = date.getDate();
  var output = (day<10 ? '0' : '') + day + '|' +
               (month<10 ? '0' : '') + month + '|' +
               date.getFullYear();

  setInterval( function() {
    $('#arrowRight').text((new Date - date) /1000);
    $('#date').text(output);
  },10);

  setInterval( function() {
    var clock = new Date;
    var time = clock.getHours() + ":" + clock.getMinutes() + ":" + clock.getSeconds();
    $("#time").text(time);
  },10);

  $('.compass').followCursor();

  $('#infoButton, .close').click(function(){
    if(!$('.info').hasClass('active')){
      $('main').fadeOut(400);
      $('.info').fadeIn(400).addClass('active');
    } else {
      $('.info').fadeOut(400).removeClass('active');
      $('main').fadeIn(400);
    }
  })

function checkWidth() {
	var windowSize = $(window).width();
	if (windowSize>1024) {


  var bodywidth = $("body").width();

  function mouse(evt) {
    var pageX = event.pageX;
    var now = 40*(pageX - bodywidth/2)/bodywidth;
    $("#noseGague").css({
        transform: 'rotate(' + now + 'deg)'
      });
  }

  var movementStrength = 50;
  var height = movementStrength / $(window).height();
  $("body").mousemove(function(e){
    var pageY = e.pageY - ($(window).height());
    var newvalueY = height * pageY * -1 - 25;

    $("#noseGague").css("background-position", "center calc(50% + "+ newvalueY +"%)");
    $("#ruler-inner-left").css("background-position", "center calc(50% + "+ newvalueY +"%)");

    var arrowLeft = document.querySelector("#arrowLeft");
    arrowLeft.innerHTML = (Math.floor(newvalueY) * 11);

  });

  $("body").mousemove(mouse);

}else{

  // $('body').imagesLoaded()
  //   .done( function( instance ) {
  //     window.stop();
  //   });

  var body = $('body');
  var maxX = body.width;
  var maxY = body.height;

  function handleOrientation(event) {
    var x = event.beta;
    var y = event.gamma;
    var z = event.alpha;

    $('#noseGague').css('transform', 'rotate(' + Math.round(z) +'deg)');

    $('.compass').css('transform', 'rotate(' + Math.round(y) +'deg)');

    if (x >  90) { x =  90};
    if (x < -90) { x = -90};

    x += 90;
    y += 90;

  }

		window.addEventListener('deviceorientation', handleOrientation);

    $(function () {
        $('#ruler-left-mobile').marquee({
         duration: 5000,
         delayBeforeStart: 0,
         duplicated: true,
         gap: 0,
         direction: 'down'
        });
    });


}};

checkWidth();

});
