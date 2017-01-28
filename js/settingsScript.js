/*
* The local storage will be formatted as:
* 
* "24hr": ["true" | "false"]
* "city": ["closest" | "farthest" | "random"]
*/

function checkPopulatedStorage() {
	if(localStorage.getItem("24hr") === null || localStorage.getItem("city") === null) {
		return false; // localStorage not yet set
	}
	return true; // localStorage already set
}