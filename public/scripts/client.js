/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

//Prevent XSS attack
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function (tweet) {
    let tweetElement = `
<article class="tweet">
        <header class="tweetHeader">
          <div> 
             <img src="${tweet.user.avatars}" alt="User Avatar" />
             <p>${tweet.user.name}</p>
          </div>
          <p> ${tweet.user.handle} </p>
        </header>
        <div class="tweetContent"> ${escape(tweet.content.text)} </div>
        <hr>
        <footer class="tweetFooter">
            <span> ${timeago.format(tweet.created_at)} </span>
            <div>
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
        </footer>
      </article>
`
    return tweetElement;
  }

  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      const tweetElement = createTweetElement(tweet)
      $('.tweets').prepend(tweetElement)
    }
  }

  // AJAX GET request
  const loadTweets = function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:8080/tweets/",
      dataType: "json",
      success: function (data) {
        console.log("tweets loaded successfully", data);
        renderTweets(data);
      },
      error: function (err) {
        console.log("Error!", err);
      }
    });
  }

  // event listener for submit in tweet form-->
  $("#tweetForm").on("submit", function (event) {
    event.preventDefault();

    // define variables
    const textLength = $("#tweet-text").val().length
    const serializedContent = $(this).serialize();

    // form validation check
    if (textLength === 0) {
      return alert("Please enter some text");
    }

    if (textLength > 140) {
      return alert("Tweet must be less than 140 characters");
    }

    // AJAX post request for submission data
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/tweets/",
      data: serializedContent,
      success: function (data) {
        console.log("Post request a success", data);
        //refetching tweets on form submission
        loadTweets();
      },
      error: function (err) {
        console.log("Error!", err);
      }
    });

  });


  //Loading tweets on page
  loadTweets();

})

