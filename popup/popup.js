const button = document.getElementById('yo');
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('button').addEventListener('click', onclick, false);

  function onclick() {
    chrome.runtime.sendMessage('popup');
    // chrome.runtime.onMessage.addListener((req) => {
    //   button.innerText = req;
    // });
  }
});
