const constraints = {
  video: {
    mandatory: {
      maxWidth: 480,
      maxHeight: 360,
    },
  },
  audio: false,

};

// The video track from getUserMedia
let track;

// Returns a Promise that is resolved with a newly created video element,
// with a source from the webcam, in playing state
function getWebcamVideo() {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.setAttribute('autoplay', true);

    navigator.getUserMedia(constraints, (stream) => {
      video.src = window.URL.createObjectURL(stream);
      track = stream.getTracks()[0];
    }, reject);

    video.addEventListener('play', () => {
      resolve(video);
    });
  });
}

export default getWebcamVideo;
