//Escape function. Used to prevent XSS from malicious tweets
const escape = (str) => {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (tweetObj) => {
  const {user, content, created_at} = tweetObj;
  const escapedContent = escape(content.text)
  const $tweet = $(`
  <article class="tweet">
    <header>
      <div>
        <img src="${user.avatars}"> 
        <h3>${user.name}</h3>
      </div>
      <h3>${user.handle}</h3>
    </header>
    <h2>${escapedContent}</h2>
    <footer>
      <h5>${timeago.format(created_at)}</h5>
      <div class="icon-container">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
</article>
`);
  return $tweet
}

const sortByLatestTweet = (tweets) => {
  const sortedTweets = [...tweets];
  sortedTweets.sort((a,b) => {
    return b.created_at - a.created_at;
  })
  return sortedTweets;
}

const renderTweets = (tweets) => tweets.map(tweet => $('#tweet-container').append(createTweetElement(tweet)));

const loadTweets = () => {
  $.get("/tweets")
  .then(tweets => sortByLatestTweet(tweets))
  .then(tweets => renderTweets(tweets))
  .catch(err => console.log(err))
}

const $error = $(`<div></div>`)

$(document).ready(function() {
  //Load initial tweets
  loadTweets()

  //On Submission
  $(".new-tweet form").on("submit", function(e){
    e.preventDefault()
    $(".new-tweet > .error").remove()
    const output = $(this).children(".tweet-btn-container").children('.counter')
    let tweet = $(this).children('#tweet-text')
    if(Number(output.val()) < 0) {
      $(".new-tweet > h2").after($error.text("⚠️ Error: Tweet length exceeds 140 characters!").addClass("error"))
    } else if (tweet.val() === "" || tweet.val() === null) {
      $(".new-tweet > h2").after($error.text("⚠️ Error: Tweet can't be empty!").addClass("error"))
    } else {
      const serializedTweet = $(this).serialize();
      $.post("/tweets", serializedTweet)
      .done($('#tweet-container').empty())
      .done(loadTweets)
      .done(tweet.val(""))
      .done(output.val(140))
    }
  })
})