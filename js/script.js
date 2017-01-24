function readConfigFile() {
	var allLinks = JSON.parse(config);
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
	
	document.getElementById("date").innerHTML = weekday + ", " + month + " " + date.getDate() + ", " + date.getYear();
	
	setTimeout(setTime(), 60000);
}

function startScript() {
	readConfigFile();
	setTime();
}