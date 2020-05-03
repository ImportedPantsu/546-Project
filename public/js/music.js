
function togglePlay() {
    var audio_elem = document.getElementById('audio');
    if(audio_elem.paused)
        audio_elem.play();
    else
        audio_elem.pause();
}