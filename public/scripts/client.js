/**Takes in an array of tweet objects and the parentHTMLElement. tweet objects are converted to 
 * HTML and appended into the partentHTMLElement*/
const createTweetElement = function (singleTweet, parentHTMLElement) {
  const $header = $('<header></header>');
  $header.append($(`<img src="${singleTweet.user.avatars}">`));
  $header.append($(`<h3 class="name">${singleTweet.user.name}</h3>`));
  $header.append($(`<h3 class="handle">${singleTweet.user.handle}</h3>`));

  const $body = $(`<p>${singleTweet.content.text}</p>`);

  const $footer = $('<footer></footer>');
  $footer.append($(`<p>${timeago.format(singleTweet.created_at)}</p>`));
  $footer.append($(`<i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i>`));

  const $tweetArticle = $('<article class="tweets"></article>');
  $tweetArticle.append($header);
  $tweetArticle.append($body);
  $tweetArticle.append($footer);

  parentHTMLElement.prepend($tweetArticle);
}




$(document).ready(function () {
  /**Sends a GET request to /tweets/ which returns a JSON object 
   * containing all the tweets in that database. The JSON object
   * is then passed to the createTweetElements function which 
   * injects the tweets into the DOM*/
  $.ajax({ url: '/tweets/', method: 'GET', })
    .then((results) => {
      for (const tweet of results) {
        createTweetElement(tweet, $('section.tweetSection'));
      }
    })
    .catch((error) => {
      console.log('error:', error);
    });

  /**New tweet submission listener */
  $("form.new-tweet").on("submit", function (event) {
    event.preventDefault();

    //error message if text submission is blank
    if ($('#tweet-text').val().length === 0) {
      alert('ya need to have something to tweet! about');
      return;
    }

    //error message if text submission is too long
    if ($('#tweet-text').val().length > 140) {
      alert('ya tweet is longer that 140 characters! TLDR BORIIINGGG!');
      return;
    }

    //sents a post request to /tweets/ if no errors were encountered.
    $.ajax({
      url: '/tweets/',
      method: 'POST',
      data: $(this).serialize(),
    })
      .then(() => { //once post request is successful we initiate a get request to /tweets/ to refresh tweets
        $.ajax({ url: '/tweets/', method: 'GET', })
          .then((results) => {
            //only add the newest element therefore we only pass the last element of results to createTweetElement
            createTweetElement(results[results.length-1], $('section.tweetSection'));
          })
      })
      .catch((error) => {
        console.log('error:', error);
      });
  })

});