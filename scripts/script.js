$(document).ready(function(){

  console.log('%c%s %c%s','font-size:20px; font-weight;700', 'Clouds based on an experiment by', 'background:yellow;font-size:20px; font-weight;700', 'https://mrdoob.com')

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



  $('#sound').click(function() {
    var track = document.getElementById('track');
    if (track.paused == false) {
      $(this).removeClass('active').html('<h1>SOUND ON</h1>');
        track.pause();
    } else {
        $(this).addClass('active').html('<h1>SOUND OFF</h1>');
        track.play();
    }
  });



  $('.compass').followCursor();

  $('#infoButton, .close').click(function(){
    if(!$('.info').hasClass('active')){
      $('main').fadeOut(400);
      $('.info').fadeIn(400).addClass('active');
      $('#infoButton').addClass('active');
    } else {
      $('#infoButton').removeClass('active');
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


			var container;
			var camera, scene, renderer;
			var mesh, geometry, material;

			var mouseX = 0, mouseY = 0;
			var start_time = Date.now();

			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;

			init();

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 3000 );
				camera.position.z = 6000;

				scene = new THREE.Scene();

				geometry = new THREE.Geometry();

				var texture = THREE.ImageUtils.loadTexture( 'images/cloud.png', null, animate );
				texture.magFilter = THREE.LinearMipMapLinearFilter;
				texture.minFilter = THREE.LinearMipMapLinearFilter;

        var fog = new THREE.Fog( 0xfdae76, - 100, 3000 );


				material = new THREE.ShaderMaterial( {

					uniforms: {

						"map": { type: "t", value: texture },
						"fogColor" : { type: "c", value: fog.color },
						"fogNear" : { type: "f", value: fog.near },
						"fogFar" : { type: "f", value: fog.far },

					},
					vertexShader: document.getElementById( 'vs' ).textContent,
					fragmentShader: document.getElementById( 'fs' ).textContent,
					depthWrite: false,
					depthTest: false,
					transparent: true

				} );

				var plane = new THREE.Mesh( new THREE.PlaneGeometry( 64, 64 ) );

				for ( var i = 0; i < 8000; i++ ) {

					plane.position.x = Math.random() * 1000 - 500;
					plane.position.y = - Math.random() * Math.random() * 200 - 15;
					plane.position.z = i;
					plane.rotation.z = Math.random() * Math.PI;
					plane.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;

					THREE.GeometryUtils.merge( geometry, plane );

				}

				mesh = new THREE.Mesh( geometry, material );
				scene.add( mesh );

				mesh = new THREE.Mesh( geometry, material );
				mesh.position.z = - 8000;
				scene.add( mesh );

				renderer = new THREE.WebGLRenderer( { antialias: false } );
				renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor( 0x000000, 0);
				container.appendChild( renderer.domElement );

				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onDocumentMouseMove( event ) {

				mouseX = ( event.clientX - windowHalfX ) * 0.25;
				mouseY = ( event.clientY - windowHalfY ) * 0.15;

			}

			function onWindowResize( event ) {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestAnimationFrame( animate );

				position = ( ( Date.now() - start_time ) * 0.03 ) % 8000;

				camera.position.x += ( mouseX - camera.position.x ) * 0.01;
				camera.position.y += ( - mouseY - camera.position.y ) * 0.01;
				camera.position.z = - position + 8000;

				renderer.render( scene, camera );

			}




});
