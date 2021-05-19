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

const renderTweets = (tweets) => tweets.map(tweet => $('#tweet-container').append(createTweetElement(tweet)));

const loadTweets = () => {
  $.get("/tweets")
  .then(tweets => renderTweets(tweets))
  .catch(err => console.log(err))
}

$(document).ready(function() {
  loadTweets()
  $(".new-tweet form").on("submit", function(e){
    e.preventDefault()
    const outputVal = $(this).children(".tweet-btn-container").children('.counter').val()
    const tweet = $(this).children('#tweet-text').val()
    if(Number(outputVal) < 0) {
      alert("Error: Tweet length exceeds 140 characters!")
    } else if (tweet === "" || tweet === null) {
      alert("Error: Tweet can't be empty!")
    } else {
      const serializedTweet = $(this).serialize();
      $.post("/tweets", serializedTweet)
    }
  })
})