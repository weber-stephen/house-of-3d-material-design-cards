var Main = (function() {

  function init(options) {
    initTilt(options);
  }

  function initTilt(options) {
    var flat = document.getElementById(options.tiltContainerID);

    if(flat) {
      var flatStyle = flat.style;
      var _transform = "WebkitTransform" in flatStyle ? "WebkitTransform" : "MozTransform" in flatStyle ? "MozTransform" : "msTransform" in flatStyle ? "msTransform" : false;
      window.addEventListener("deviceorientation", function(e) {
          flatStyle[_transform] = "perspective(500px) rotateY("+(-e.gamma)+"deg) rotateX("+e.beta+"deg) rotateZ("+-(e.alpha-180)+"deg)";
      });
    }

    var screenWidth = window.screen.width / 2;
    var screenHeight = window.screen.height / 2;
    var validPropertyPrefix = '';
    var otherProperty = 'perspective(500px)';

    if(typeof flat.style.webkitTransform == 'string') {
      validPropertyPrefix = 'webkitTransform';
    } else {
      if (typeof flat.style.MozTransform == 'string') {
        validPropertyPrefix = 'MozTransform';
      }
    }

    document.addEventListener('mousemove', function (e) {
      // vars 
      var centroX   = e.clientX - screenWidth,
        centroY   = screenHeight - (e.clientY + 13),
        degX   = centroX * 0.1,
        degY   = centroY * 0.1;

      // Seta o rotate do elemento
      flat.style[validPropertyPrefix] = otherProperty + 'rotateY('+ degX +'deg)  rotateX('+ degY +'deg)';
    });
  }

  return {
    init:init
  };

})();