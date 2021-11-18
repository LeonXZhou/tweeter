$(document).ready(function () {
  /** Updates character counter based on the 140 - length of input string*/
  const updateCounter = function (event) {
    const $counter = $('.counter[name=counter][for=tweet-text]');
    const $tweetText = $(this);

    $counter.text(140 - $tweetText.val().length); // set counter to 140 minus the length of the input string
    if ($('#tweet-text').val().length > 140) { //controls color of tweet-text
      $counter.css('color', 'red');
      console.log('asdf')
    }
    else {
      $counter.css('color', 'black');
      console.log('asdf')
    }
  }
  $('#tweet-text').on('input', null, updateCounter);
});