const contraints = {
    audio: false, 
    video: {
        width: { ideal: 1280 },
        height: { ideal: 720 }
    }
}

let imageCapture = null

const handleMediaErrors = (e) => {
    switch(e.name) {
        case "NotFoundError":
          alert("Unable to open your call because no camera and/or microphone" +
                "were found.");
          break;
        case "SecurityError":
        case "PermissionDeniedError":
          // Do nothing; this is the same as the user canceling the call.
          break;
        default:
          alert("Error opening your camera and/or microphone: " + e.message);
          break;
      }
}
const captureMedia = async (contraints) => {
    let stream = null
    try {
        stream = await navigator.mediaDevices.getUserMedia(contraints)
        // attach stream to object
        const video = document.querySelector('video')
        video.srcObject = stream
        video.onloadedmetadata = () => {
            video.play()
        }
        const track = stream.getVideoTracks()[0]
        imageCapture = new ImageCapture(track)
    } catch (err) {
        /**handle the error */
        handleMediaErrors(err)
    }
}
const registerEventListners = () => {
    const snapBtn = document.getElementById('snapBtn')
    snapBtn.addEventListener('click', snap)
}
const snap =  async (evt) => {
        console.log(imageCapture)
        const imageBlob = await imageCapture.takePhoto()
        const imageSrc = URL.createObjectURL(imageBlob)
       //
        const image = document.getElementById('photo')
        image.src = imageSrc
   }
captureMedia(contraints)
registerEventListners()

