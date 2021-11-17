$(document).ready(function () {
  const tweetText = document.querySelector('#tweet-text');

  const updateCounter = function (event) {
    const tweetLength = tweetText.value.length;
    const counter = document.querySelector('.counter[name=counter][for=tweet-text]');
    counter.innerHTML = 140 - tweetLength;
    if (tweetLength > 140) {
      counter.style.setProperty('color', 'red');
    }
    else {
      counter.style.setProperty('color', 'black');
    }
  }

  tweetText.addEventListener('input', updateCounter);
});