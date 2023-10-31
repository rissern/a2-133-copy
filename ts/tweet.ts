class Tweet {
	private text:string;
	time:Date;
    whichday:string;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
        this.whichday = tweet_time;
	}

    get getDay():string {
        if(this.whichday.includes('Sun '))
        {
            return "Sun";
        }
        else if(this.whichday.includes('Mon '))
        {
            return "Mon";
        }
        else if(this.whichday.includes('Tue '))
        {
            return "Tue";
        }
        else if(this.whichday.includes('Wed '))
        {
            return "Wed";
        }
        else if(this.whichday.includes('Thu '))
        {
            return "Thu";
        }
        else if(this.whichday.includes('Fri '))
        {
            return "Fri";
        }
        else if(this.whichday.includes('Sat'))
        {
            return "Sat";
        }
        else
        {
            return " ";
        }

    }

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        let upper = this.text.toUpperCase();
        if(upper.includes('JUST COMPLETED') || upper.includes('JUST POSTED'))
        {
            return "COMPLETED";
        }
        else if (upper.includes('RIGHT NOW')) 
        {
            return "LIVE";
        }
        else if (upper.includes('SET A GOAL') || upper.includes('MET MY') || upper.includes('ACHIEVED'))
        {
            return "ACHIEVE";
        }
        else
        {
            return "MISC"
        }
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        if(this.text.includes(' - '))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        return "";
    }

    get activityType():string {
        if (this.source != 'COMPLETED') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        let upper = this.text.toUpperCase();
        if(upper.includes(' RUN '))
        {  
            if(!upper.includes(' SKI '))
            {
                return "running"; 
            }
            else if(upper.includes(' SKI RUN '))
            {
                return "skiing";
            }
        }
        else if(upper.includes(' BIKE '))
        {           
            return "biking"; 
        }
        else if(upper.includes(' CHAIR RIDE '))
        {
            return "chair riding";
        }
        else if(upper.includes(' FREESTYLE '))
        {
            return "freestyle";
        }
        else if(upper.includes(' HIKE '))
        {
            return "hiking";
        }
        else if(upper.includes(' KM ACTIVITY ') || upper.includes(' MI ACTIVITY '))
        {
            return "activity";
        }
        else if(upper.includes(' WALK '))
        {
            return "walking";
        }
        else if(upper.includes(' WORKOUT '))
        {
            return "workout";
        }
        else if(upper.includes(' SWIM '))
        {
            return "swimming";
        }
        else if(upper.includes(' YOGA '))
        {
            return "yoga";
        }
       

        return "";
    }

    get distance():number {
        if(this.source != 'COMPLETED') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet

        let distString: string ="";
        let distArray;
        if(this.text.includes(' mi '))
        {
            distArray = this.text.match(/(?<= a )(.*?)(?= mi )/);
            if(distArray != null)
            {
                distArray.forEach(element =>
                {
                    if(element != null)
                    {
                        distString += element.toString();
                    }
                });
            }
            let mi = parseFloat(distString);
            let miString: string = mi.toFixed(2);
            let miRet = parseFloat(miString);
            return miRet;
        }
        else if (this.text.includes(' km '))
        {
            distArray = this.text.match(/(?<=a )(.*?)(?= km )/);
            if(distArray != null)
            {
                distArray.forEach(element =>
                {
                    if(element != null)
                    {
                        distString += element.toString();
                    }
                });
            }

            let km = parseFloat(distString);
            let mi = km/1.609;
            let miString: string = mi.toFixed(2);
            let miRet = parseFloat(miString);
            return miRet;
        }

        return 0;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}