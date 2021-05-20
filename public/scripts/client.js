const createTweetElement = (tweetObj) => {
  const $tweet = $(`
  <article class="tweet">
    <header>
      <div>
        <img src="${tweetObj.user.avatars}"> 
        <h3>${tweetObj.user.name}</h3>
      </div>
      <h3>${tweetObj.user.handle}</h3>
    </header>
    <h2>${tweetObj.content.text}</h2>
    <footer>
      <h5>${timeago.format(tweetObj.created_at)}</h5>
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

$(document).ready(function() {
  //Load initial tweets
  loadTweets()

  //On Submission
  $(".new-tweet form").on("submit", function(e){
    e.preventDefault()
    const outputVal = $(this).children(".tweet-btn-container").children('.counter').val()
    let tweet = $(this).children('#tweet-text')
    if(Number(outputVal) < 0) {
      alert("Error: Tweet length exceeds 140 characters!")
    } else if (tweet.val() === "" || tweet.val() === null) {
      alert("Error: Tweet can't be empty!")
    } else {
      const serializedTweet = $(this).serialize();
      $.post("/tweets", serializedTweet)
      .then(tweet.val(''))
      .then($("#tweet-container").empty())
      .then(loadTweets())
    }
  })
})