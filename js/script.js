function checkFileAPI() {
	if(window.File && window.FileReader && window.FileList && window.Blob) {
		return true;
	} else {
		return false;
	}
}
function readConfigFile() {
	var output = "";
	var configFile = new File([""], "config.txt", {type: "text/plain", size: 100});
	
	if(checkFileAPI()) {
		var reader = new FileReader();
		reader.onload = function(e){
			var allLinks = e.target.result.split(/\r\n/);
			
			for(var i = 0; i < allLinks.length; i++) {
				
				let name = allLinks[i];
				let link = allLinks[i];
				
				let row = document.getElementById("topRow");
				let cell = row.insertCell(i);
				cell.innerHTML = "<a href=" + link + ">" + name + "</a>";
			}
		}
		
		reader.readAsText(configFile);
	} else {
		alert('Your browser does not support the File API.');
	}
}