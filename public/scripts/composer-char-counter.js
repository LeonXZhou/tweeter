$(document).ready(function() {
  const tweetText = document.querySelector('#tweet-text');
  const updateCounter = function(event){
    console.log(tweetText.value);
  }

  tweetText.addEventListener('input',updateCounter);
});