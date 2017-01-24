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

	if(date.getMinutes() < 10) {
		document.getElementById("time").innerHTML = date.getHours() + ":0" + date.getMinutes();
	} else {
		document.getElementById("time").innerHTML = date.getHours() + ":" + date.getMinutes();
	}
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
	xhr.open("POST", "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBjRRMtqV4VdybDPjr-tNObKI6qbAukdYE");
	xhr.setRequestHeader("key", "AIzaSyBjRRMtqV4VdybDPjr-tNObKI6qbAukdYE");
		
	xhr.onload = function() {
		var minDist = 40075;
		var minCity;
		var response = JSON.parse(xhr.response);
		for(var key in cities) {
			let d = getDistanceFromLatLon(response["location"]["lat"], response["location"]["lng"], cities[key]["lat"], cities[key]["lon"]);
			if(d < minDist) {
				minDist = d;
				minCity = key;
			}
		}
		let file = cities[minCity]["img"];
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