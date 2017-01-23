function readConfigFile() {
	var allLinks = JSON.parse(config);
	var row = document.getElementById("topRow");
	
	for(var i = 0; i < allLinks.length; i++) {
		let c = row.insertCell(i);
		c.innerHTML = "<a href=" + allLinks[i]["link"] + ">" + allLinks[i]["name"] + "</a>";
	}
}