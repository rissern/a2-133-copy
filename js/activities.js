function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
	
	let activityMap = new Object();
	activityMap['running'] = {count: 0, total: 0};
	activityMap['skiing'] = {count: 0, total: 0};
	activityMap['biking'] = {count: 0, total: 0};
	activityMap['chair riding'] = {count: 0, total: 0};
	activityMap['freestyle'] = { count: 0, total: 0};
	activityMap['hiking'] = {count: 0, total: 0};
	activityMap['activity'] = {count: 0, total: 0};
	activityMap['walking'] = {count: 0, total: 0};
	activityMap['workout'] = {count: 0, total: 0};
	activityMap['swimming'] = {count: 0, total: 0};
	activityMap['yoga'] = {count: 0, total: 0};
	
	tweet_array.forEach(element => 
	{
		if(element.activityType==="running")
		{ 
			activityMap['running'].count++;
			activityMap['running'].total+=element.distance;
		}
		else if(element.activityType==="skiing")
		{ 
			activityMap['skiing'].count++;
			activityMap['skiing'].total+=element.distance;
		}
		else if(element.activityType==="biking")
		{ 
			activityMap['biking'].count++;
			activityMap['biking'].total+=element.distance;
		}
		else if(element.activityType==="chair riding")
		{ 
			activityMap['chair riding'].count++;
			activityMap['chair riding'].total+=element.distance;
		}
		else if(element.activityType==="freestyle")
		{
			activityMap['freestyle'].count++;
			activityMap['freestyle'].total+=element.distance;
		}
		else if(element.activityType==="hiking")
		{ 
			activityMap['hiking'].count++;
			activityMap['hiking'].total+=element.distance;
		}
		else if(element.activityType==="activity")
		{ 
			activityMap['activity'].count++;
			activityMap['activity'].total+=element.distance;
		}
		else if(element.activityType==="walking")
		{ 
			activityMap['walking'].count++; 
			activityMap['walking'].total+=element.distance;
		}	
		else if(element.activityType==="workout")
		{
			activityMap['workout'].count++;
			activityMap['workout'].total+=element.distance;
		}
		else if(element.activityType==="swimming")
		{ 
			activityMap['swimming'].count++;
			activityMap['swimming'].total+=element.distance;
		}
		else if(element.activityType==="yoga")
		{ 
			activityMap['yoga'].count++;
			activityMap['yoga'].total+=element.distance;
		} 
		
		
	});

	let activityArray = [];
	for(let key in activityMap)
	{
		activityArray.push(
		{
			count: activityMap[key].count,
			totalDist: activityMap[key].total,
			activity: key
		}
		);

		console.log(key);
		console.log(activityMap[key]);
	}
	console.log('\t');

	

	let activitySorted = activityArray.sort(function(x, y)
	{
		return x.count - y.count
	});
	console.log('sorted');
	console.log(activitySorted);
	console.log('\t');

	$('#numberActivities').text(activitySorted.length);

	let first = activitySorted[activitySorted.length - 1].activity;
	let second = activitySorted[activitySorted.length - 2].activity;
	let third = activitySorted[activitySorted.length - 3].activity;

	$('#firstMost').text(first);
	$('#secondMost').text(second);
	$('#thirdMost').text(third);

	let distArray = [
		{act: activitySorted[activitySorted.length - 1].activity, 
			distTotal: activitySorted[activitySorted.length - 1].totalDist
			/ activitySorted[activitySorted.length - 1].count,
			name: "placeholder"},
		{act: activitySorted[activitySorted.length - 2].activity, 
			distTotal: activitySorted[activitySorted.length - 2].totalDist
			/ activitySorted[activitySorted.length - 2].count,
			name: "placeholder"},
		{act: activitySorted[activitySorted.length - 3].activity, 
			distTotal: activitySorted[activitySorted.length - 3].totalDist
			/ activitySorted[activitySorted.length - 3].count,
			name: "placeholder"}
	];

	distArray.sort(function (a, b)
	{
		return a.distTotal - b.distTotal
	});

	distArray.forEach(element =>
	{
		if(element.act === "running")
		{
			element.name = " run ";
		}
		else if (element.act === "skiing")
		{
			element.name = " ski ";
		}
		else if (element.act === "biking")
		{
			element.name = " bike ";
		}
		else if (element.act === "chair riding")
		{
			element.name = " chair ride ";
		}
		else if (element.act === "hiking")
		{
			element.name = " hike ";
		}
		else if (element.act === "walking")
		{
			element.name = " walk ";
		}
		else if (element.act === "swimming")
		{
			element.name = " swim ";
		}
	});

	console.log('dist sorted');
	console.log(distArray);
	console.log('\t');

	$('#longestActivityType').text(distArray[2].name);
	$('#shortestActivityType').text(distArray[0].name);

	let weekday = 0;
	let weekend = 0;
	tweet_array.forEach(element =>
	{ 
		if(element.activityType===distArray[2].act)
		{
			if(element.whichday.includes('Sat ') || element.whichday.includes('Sun '))
			{
				weekend++;
			}
			else
			{
				weekday++;
			}
		}
	}); 
	console.log('weekdays ' + weekday);
	console.log('weekends ' + weekend);
	console.log('\t');
	
	if(weekend > weekday)
	{
		$('#weekdayOrWeekendLonger').text('weekends');
	}
	else
	{
		$('#weekdayOrWeekendLonger').text('weekdays');
	}


	let daysArray = [];
	console.log('tweet_array.length: ' + tweet_array.length);
	tweet_array.forEach(element =>
	{
		if((element.activityType===first) || (element.activityType===second) || (element.activityType===third))
		{
			daysArray.push
			({
				day: element.getDay,
				activity: element.activityType,
				distance: element.distance
			});
		}
	});

	console.log('daysArray');
	console.log(daysArray);
	console.log("\t");


	activity_vis_spec =
	{
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph of the number of Tweets containing each type of activity.",
		"width": 450,
		"height": 450,
		"data":
		{
			"values": activityArray
	  	},
		"mark": "bar",
		"encoding":
		{
			"x": {"field": "count", "type": "quantitative", "axis": {"title": "amount"}},
			"y": {"field": "activity", "type": "ordinal"},
			"color": {"value": "#4A412A"}
		}
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	distance_vis_spec =
	{
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph that plots the distances for each day of the week.",
		"width": 450,
		"height": 450, 
	  	"data":
		{
			"values": daysArray
		},
		"mark": "tick",
		"encoding":
		{
			"x":{"field": "distance", "type": "quantitative"},
			"y":
			{
				"field": "day",
				"type": "ordinal",
				"sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
				"axis": {"title": "day"}
			},
			"color":
			{
				"field": "activity",
				"type": "nominal",
				"scale":
				{
					"domain": [activitySorted[activitySorted.length - 1].activity,
					activitySorted[activitySorted.length - 2].activity,
					activitySorted[activitySorted.length - 3].activity],
					"range": ["red", "green", "blue"]
				},
				"legend": {"title": "activities"}
			}
		}
	};
	vegaEmbed('#distanceVis', distance_vis_spec, {actions:false});

	distance_vis_aggregated =
	{
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph that plots the average distances for each day of the week.",
		"width": 450,
		"height": 450, 
	  	"data":
	  	{
			"values": daysArray
		},
		"mark": "point",
		"encoding":
		{
			"x":
			{
				"field": "distance",
				"aggregate": "average",
				"type": "quantitative",
				"axis": {"title": "average"}
			},
			"y":
			{
				"field": "day",
				"type": "ordinal",
				"sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
				"axis": {"title": "day"}
			},
			"color":
			{
				"field": "activity",
				"type": "nominal",
				"scale": {
					"domain": [activitySorted[activitySorted.length - 1].activity,
					activitySorted[activitySorted.length - 2].activity,
					activitySorted[activitySorted.length - 3].activity],
					"range": ["red", "green", "blue"]
				},
				"legend": {"title": "activities"}
			}
		}
	};
	vegaEmbed('#distanceVisAggregated', distance_vis_aggregated, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);

	$("#distanceVisAggregated").hide();
	$("#aggregate").click(function(event)
	{
		var elem = $(event.target);
		if (elem.text()=="Show all activities")
		{
			elem.text("Show means");
			$("#distanceVis").show();
			$("#distanceVisAggregated").hide();
		}
		else if (elem.text()=="Show means")
		{
			elem.text("Show all activities");
			$("#distanceVis").hide();
			$("#distanceVisAggregated").show();
		}
	});
});