/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function(){

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  // loops through tweets
  for (let tweet of tweets) {
  // calls createTweetElement for each tweet
   const tweetElement = createTweetElement(tweet)
   // takes return value and appends it to the tweets container
   $('.tweets').prepend(tweetElement)
}
}

const createTweetElement = function(tweet) {
  let $tweet = $("<article>").addClass("tweet")
let html = `
<article class="postedTweets">
        <header class="tweetHeader">
          <div>
            ${tweet.user.avatars}
          </div>
            ${tweet.user.handle}
        </header>
        <div class="tweetContent">
          ${tweet.content.text}
        </div>
        <hr>
        <footer class="tweetFooter">
            ${tweet.created_at}
            <div>
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
        </footer>
      </article>
`
let tweetElement = $tweet.append(html)
return tweetElement;
}

renderTweets(data);

// event listener for submit in tweet form-->
 $( "#tweetForm" ).on( "submit", function(event) {
   event.preventDefault();

   const serializedContent =  $(this).serialize();
  //  console.log("this is what i need" , serializedContent);
  // AJAX post request for submission data

  $.ajax({
    type: "POST",
    url: "http://localhost:8080/tweets/",
    data: serializedContent,
    success: function(data) {
      console.log("this is a success", data)
    }, 
    error: function(err) {
      console.log("Error!", err)
    }
  });

  });

})

