/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const initialTweets = [{
  
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}
]

const renderTweets = function(tweets) {
  const $tweetsContainer = $('#tweets-container');

  for (i = 0; i < tweets.length; i++) {
    const $tweetElement = createTweetElement(tweets[i]);
    $tweetsContainer.append($tweetElement);
  }
}

const createTweetElement = function(tweet) {

  const $article = $('<article>').addClass('tweet');
  const $header = $('<header>').addClass('tweet-header');
  const $span = $('<header>').addClass('profile');
  const $avatar = $('<img>').addClass('avatar').attr('src', tweet.user.avatars);
  const $name = $('<h1>').addClass('name').text(tweet.user.name);
  const $handle = $('<h5>').addClass('handle').text(tweet.user.handle);
  // Prevent cross-site scripting
  const $content = $('<h3>').addClass('content').text(tweet.content.text);
  const $footer = $('<footer>');
  const $timestamp = $('<h4>').addClass('timestamp').text(timeago.format(tweet.created_at));
  const $icons = $('<div>').addClass('icons');
  const $flagIcon = $('<i>').addClass('fa-solid fa-flag');
  const $retweetIcon = $('<i>').addClass('fa-solid fa-retweet');
  const $heartIcon = $('<i>').addClass('fa-solid fa-heart');

  $span.append($avatar, $name);
  $header.append($span, $handle);
  $icons.append($flagIcon, $retweetIcon, $heartIcon);
  $footer.append($timestamp, $icons)
  $article.append($header, $content, $footer);

  return $article
}

$(document).ready(function() {

  renderTweets(initialTweets);

$('form').submit(function(event) {
  event.preventDefault();

  const $form = $(this);
  const $tweetText = $form.find('textarea[name="text"]');
  const tweetContent = $tweetText.val();
  let $errorElement = $('#error-message');

  if (!tweetContent) {
    const $errorIcon = $('<i>').addClass("fa-solid fa-triangle-exclamation");
    const $errorMessage = $('<h6>').text("Error: Your tweet is empty!")
    const $errorContainer = $('<div>').addClass('error-container');

    $errorContainer.append($errorIcon, $errorMessage);
    $errorElement.empty().append($errorContainer);
    $errorElement.slideDown();
    return
  }

  if (tweetContent.length > 140) {
    const $errorIcon = $('<i>').addClass("fa-solid fa-triangle-exclamation");
    const $errorMessage = $('<h6>').text("Error: Your tweet too long!")
    const $errorContainer = $('<div>').addClass('error-container');

    $errorContainer.append($errorIcon, $errorMessage);
    $errorElement.empty().append($errorContainer);
    $errorElement.slideDown();
    return
  }

  const formData = $(this).serialize();

$.post("/tweets", formData)
  .then(function(response) {
    console.log(response);

    $tweetText.val("");
    loadTweets();
    });

    $errorElement.hide();
  });

  const loadTweets = function() {
    $.getJSON("/tweets")
      .then(function(tweets) {
        renderTweets(tweets);
      })
  }
  loadTweets();
});