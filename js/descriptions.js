var writtenTweets = [];

function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//TODO: Filter to just the written tweets

	tArray = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	let holdTweet = "";
	let hyperTweet = "";
	tArray.forEach(element => {
		if(element.written) {
			let fullLink = '<a href="' + element.getLink + '">'  + element.getLink +'</a>';
			holdTweet = element.text;
			hyperTweet = holdTweet.replace(element.getLink, fullLink);
			writtenTweets.push
			({
				activityType: element.activityType,
				tweet: hyperTweet
			});
		}
	});
	
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	$('#searchText').text($('#textFilter').val());
	
	let searchTweets = [];

	if($('#searchText').text()!=""){
		searchTweets = writtenTweets.filter( element => {
			if(element.tweet.includes($('#searchText').text())){
					return element;
			}
	
		});
	}

	$('#searchCount').text(searchTweets.length);

	$('#tweetTable').empty();
	

	let track = 1;
	let htmlText = "";
	let count = "";
	let type = "";
	let tweet = "";
	searchTweets.forEach(element =>
	{
		htmlText = "<tr>";
		count = "<td>" + track  +"</td>"; 
		htmlText += count;
		type = "<td>"+ element.activityType + "</td>"; 
		htmlText += type;
		tweet = "<td>" + element.tweet + "</td>"; 
		htmlText += tweet;
		htmlText += "</tr>";

		$('#tweetTable').append(htmlText);
		track++;
	});
	
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	$('#textFilter').keypress(addEventHandlerForSearch());
	loadSavedRunkeeperTweets().then(parseTweets);
});