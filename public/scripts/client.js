/**Takes in an array of tweet objects and the parentHTMLElement. tweet objects are converted to 
 * HTML and appended into the partentHTMLElement*/
const createTweetElements = function (tweets, parentHTMLElement) {
  for (const singleTweet of tweets) {
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

    parentHTMLElement.append($tweetArticle);
  }
}


$(document).ready(function () {
  /**Sends a GET request to /tweets/ which returns a JSON object 
   * containing all the tweets in that database. The JSON object
   * is then passed to the createTweetElements function which 
   * injects the tweets into the DOM*/
  $.ajax({ url: '/tweets/', method: 'GET', })
    .then((results) => {
      createTweetElements(results, $('section.tweetSection'));
    })
    .catch((error) => {
      console.log('error:', error);
    })

  $("form.new-tweet").on("submit", function (event) {
    event.preventDefault();
    $.ajax({
      url: '/tweets/',
      method: 'POST',
      data: $(this).serialize(),
    })
  })

});