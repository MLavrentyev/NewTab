function readHeaderConfigFile() {
	var allLinks = JSON.parse(headerConfig);
	var row = document.getElementById("topRow");
	
	for(var i = 0; i < allLinks.length; i++) {
		let c = row.insertCell(i);
		c.innerHTML = "<a href=" + allLinks[i]["link"] + ">" + allLinks[i]["name"] + "</a>";
	}
	let finalCell = row.insertCell(i);
}
function setTime() {
	var date = new Date();
	var hours = date.getHours();
	var ampm = hours>11 ? "pm" : "am";
	
	if(date.getHours()/12 > 1 && !JSON.parse(settings)["24hr"]) {
		hours = hours % 12;
	} 
	hours = hours==0? 12:hours;
	
	if(!JSON.parse(settings)["24hr"]) {
		document.getElementById("ampmDisplay").style.display = "block";
	}else if(JSON.parse(settings)["24hr"]) {
		document.getElementById("ampmDisplay").style.display = "none";
	}
	var finalString = hours;	
	
	if(date.getMinutes() < 10) {
		finalString += ":0" + date.getMinutes();
	} else {
		finalString += ":" + date.getMinutes();
	}
	
	document.getElementById("time").innerHTML = finalString;
	
	if(ampm == "pm") {
		document.getElementById("am").style.color = "#555555";
		document.getElementById("pm").style.color = "#FFFFFF";
	} else {
		document.getElementById("am").style.color = "#FFFFFF";
		document.getElementById("pm").style.color = "#555555";
	}
	
	// Set weekday
	let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()];
	let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.getMonth()];
	
	document.getElementById("date").innerHTML = weekday + ", " + month + " " + date.getDate() + ", " + (date.getYear()+1900);
}

function getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
	var R = 6371;
	var dLat = (lat2-lat1)*Math.PI/180;
	var dLon = (lon2-lon1)*Math.PI/180;
	
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLon/2) * Math.sin(dLon/2);
	
	var c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R*c;
	
	return d;
}

function setPlace() {
	var cities = JSON.parse(cityLookup);
	
	var xhr = new XMLHttpRequest();
	xhr.timeout = 1000;
	xhr.open("POST", "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBjRRMtqV4VdybDPjr-tNObKI6qbAukdYE");
	xhr.setRequestHeader("key", "AIzaSyBjRRMtqV4VdybDPjr-tNObKI6qbAukdYE");

	xhr.ontimeout = function() {
		let keys = Object.keys(cities);
		theCity = keys[ keys.length * Math.random() << 0];
		let file = cities[theCity]["img"];
		document.body.style.backgroundImage = "url(img/cities/" + file + ")";
	}
	
	xhr.onload = function() {
		var minDist = 40075;
		var theCity;
		var response = JSON.parse(xhr.response);
		
		if(JSON.parse(settings)["closestCity"]) {
			for(var key in cities) {
				let d = getDistanceFromLatLon(response["location"]["lat"], response["location"]["lng"], cities[key]["lat"], cities[key]["lon"]);
				if(d < minDist) {
					minDist = d;
					theCity = key;
				}
			}
		} else if(JSON.parse(settings)["farthestCity"]) {
			minDist = 0;
			for(var key in cities) {
				let d = getDistanceFromLatLon(response["location"]["lat"], response["location"]["lng"], cities[key]["lat"], cities[key]["lon"]);
				if(d > minDist) {
					minDist = d;
					theCity = key;
				}
			}
		} else {
			let keys = Object.keys(cities);
			theCity = keys[ keys.length * Math.random() << 0];
		}
		let file = cities[theCity]["img"];
		document.body.style.backgroundImage = "url(img/cities/" + file + ")";
	}
	xhr.send();
}
function startScript() {
	setTime();
	readHeaderConfigFile();
	setPlace();
	setInterval(setTime, 1000);
}