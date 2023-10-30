function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;
	
	var ftweet= tweet_array[0];
	var ltweet = tweet_array[tweet_array.length-1];
	var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	$('#firstDate').text(ltweet.time.toLocaleDateString('en-US', options));
	$('#lastDate').text(ftweet.time.toLocaleDateString('en-US', options));

	var completed = 0;
	var live = 0;
	var achieve = 0;
	var misc = 0;
	tweet_array.forEach(element => 
	{
		if(element.source === "COMPLETED")
		{ 
			completed++;
		}
		else if(element.source === "LIVE")
		{ 
			live++; 
		}
		else if(element.source === "ACHIEVE")
		{ 
			achieve++; 
		}
		else if(element.source === "MISC")
		{ 
			misc++; 
		}
	});

	$('.completedEvents').text(completed);
	$('.liveEvents').text(live);
	$('.achievements').text(achieve);
	$('.miscellaneous').text(misc);

	var cPct = ((completed/tweet_array.length)*100).toFixed(2);
	var lPct = ((live/tweet_array.length)*100).toFixed(2);
	var aPct = ((achieve/tweet_array.length)*100).toFixed(2);
	var mPct = ((misc/tweet_array.length)*100).toFixed(2);

	$('.completedEventsPct').text(cPct + "%");
	$('.liveEventsPct').text(lPct + "%");
	$('.achievementsPct').text(aPct + "%");
	$('.miscellaneousPct').text(mPct + "%");

	var writeTotal = 0;
	tweet_array.forEach(element =>
	{
		if(element.written)
		{
			writeTotal++;
		}
	});		
		var writePct = ((writeTotal/tweet_array.length)*100).toFixed(2);
		$('.written').text(writeTotal);
		$('.writtenPct').text(writePct + "%");
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});