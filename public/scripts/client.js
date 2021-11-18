const createTweetElement = function (tweets, parentHTMLElement) {
  for (const singleTweet of tweets) {
    const $header = $('<header></header>');
    $header.append($(`<img src="${singleTweet.user.avatars}">`));
    $header.append($(`<h3 class="name">${singleTweet.user.name}</h3>`));
    $header.append($(`<h3 class="name">${singleTweet.user.handle}</h3>`));

    const $body = $(`<p>${singleTweet.content.text}</p>`);
    
    const $footer = $('<footer></footer>');
    $footer.append($(`<p>${timeago.format(singleTweet.created_at)}</p>`));
    $footer.append($(`<i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i>`))

    const $tweetArticle = $('<article class="tweets"></article>');
    $tweetArticle.append($header)
    $tweetArticle.append($body)
    $tweetArticle.append($footer)

    parentHTMLElement.append($tweetArticle);
  }
}


$(document).ready(function () {
  $.ajax({ url: '/tweets/', method: 'GET', })
    .then((results) => {
      console.log(results)
      createTweetElement(results, $('section.tweetSection'))
    })
    .catch((error) => {
      console.log('error:', error);
    })

});