// CONSTANTS
const THRESHOLD = 2;
// Retrieve the Youtube Player
const youtubePlayer = document.getElementsByClassName(
  'video-stream html5-main-video'
)[0];

// Chrome Extension API
// Listen for message from background.js
// Receives adjusted time if it is not in sync.
chrome.runtime.onMessage.addListener((req) => {
  youtubePlayer.currentTime = req;
});
// Wait for page to finish loading
//window.addEventListener('load', () => {
let prev_time = youtubePlayer.currentTime;
let prev_pause_state = youtubePlayer.paused;
// Look for instance when user makes a significant change to current time
// Detects this by comparing current time to previous time half a second ago.
setInterval(() => {
  if (Math.abs(youtubePlayer.currentTime - prev_time) > THRESHOLD) {
    chrome.runtime.sendMessage({
      title: 'MSG_TIMESKIP',
      payload: youtubePlayer.currentTime,
    });
  }
  if (youtubePlayer.paused != prev_pause_state) {
    chrome.runtime.sendMessage({
      title: 'MSG_PAUSE',
      payload: youtubePlayer.paused,
    });
  }
  prev_pause_state = youtubePlayer.paused;
  prev_time = youtubePlayer.currentTime;
}, 500);
//});
