# NewTab
This is a new tab page meant to be displayed when a new tab is opened in a browser.

## Installation
For Firefox (55 and later), download the New Tab Override Add-on (here: https://addons.mozilla.org/en-US/firefox/addon/new-tab-override/). Set the option to "Custom URL" and set the directory to https://mlavrentyev.github.io/NewTab. You can also use any other custom-link new tab extension in other browsers as well.

## Description
The new tab page displays hotlinks at the top of the page for commonly-used pages. These can be modified in the headerConfig.json file if you fork it and instead use the local files for your new tab. Additional settings can be set in the settings.json file. If nearest or farthest city is choosen, you will need an internet connection to use it. If none is available, a random city background is loaded.

## Cities Used
A full list of cities used is found in `img\cityLookup.json`. If you would like to add cities for your own use, simply add a JSON object to the list in the following format: 
~~~~
"City Name": {\
    "img": "image-name.png",\
    "lat": 45.0000,\
    "lon": 45.0000\
}
~~~~

