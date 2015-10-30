(function() {
  console.log('camera?');

  var video = document.querySelector('video');
  var canvas = document.querySelector('canvas');
  var img = document.querySelector('img');
  var ctx = canvas.getContext('2d');
  var localMediaStream = null;

  function hasGetUsermedia() {
    console.log('hasGetUsermedia');
    return !!(navigator.getUserMedia ||
              navigator.webkitGetUserMedia ||
              navigator.mozGetUserMedia ||
              navigator.msGetUserMedia);
  }

  if (hasGetUsermedia) {
    console.log('getUserMedia() is supported in your browser');
  } else {
    alert('getUserMedia() is not supported in your browser');
  }

  navigator.getUserMedia = (navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia ||
                            navigator.msGetUserMedia);

  var onFailSoHard = function(e) {
    console.log('onFailSoHard');
    console.log('Reeeejected!', e);
  };

  var videoStart =  function(localMediaStream) {
    console.log('videoStart');
    video.src = window.URL.createObjectURL(localMediaStream);
  };

  navigator.getUserMedia({video: true, audio: false}, videoStart, onFailSoHard);

  function snapshot(localMediaStream) {
    console.log('snapshot');
    if (localMediaStream) {
      ctx.drawImage(video, 0, 0);
      img.src = canvas.toDataURL('image/webp');
    }
  }

  video.addEventListener('click', snapshot, false);

})();
