// ==UserScript==
// @name         Youtube BPM Meter
// @version      1.3
// @updateURL    https://raw.githubusercontent.com/Greeniac916/YoutubeBPM/master/youtube-bpm.js
// @description  Plugin adding beat counter to Youtube
// @author       Greeniac916
// @match        https://www.youtube.com/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==
var playButton = $(".ytp-play-button");
var bpmDelay = 0;
var beats = 0;
var interval, loadInt;

function setup() {
	//Create HTML String Elements
	var card = "<div id='bpm-header' class='yt-card yt-card-has-padding'></div>";
	var input = "<input id='bpm-input' placeholder='Enter BPM' type='number' style='vertical-align: middle'>";
	var submit = "<input id='bpm-btn' type='button' value='Submit' style='vertical-align: middle'>";
	var reset = "<input id='rst-btn' type='button' value='Reset' style='vertical-align: middle'>";
	var output = "<span id='span-beats-text' style='float: right; vertical-align: middle;'>Beats: 0</span>";
	//Insert Card Div
	$("#watch7-content").prepend(card);
	//Insert HTML elements to card
	$("#bpm-header").append(input);
	$("#bpm-header").append(submit);
	$("#bpm-header").append(reset);
	$("#bpm-header").append(output);
	//Bind Buttons
	$("#bpm-btn").bind("click", function() {
		var bpm = $("#bpm-input")[0].value;
		bpmDelay = 60000 / bpm; //Converts BPM to milisecond intervals
		clearInterval(interval);
		counter();
	});
	$("#rst-btn").bind("click", function() {
		beats = 0;
		display(0);
	});
}

function display(value) {
	$("#span-beats-text")[0].textContent = "Beats: " + value;
}

function counter() {
	interval = setInterval(function() {
		display(beats);
		if (playButton.attr("aria-label") == "Pause") { //If youtube paying video
			beats++;
		}
	}, bpmDelay);
}

function waitForElement(elementPath, callBack){
  window.setTimeout(function(){
    if($(elementPath).length){
      callBack(elementPath, $(elementPath));
    }else{
      waitForElement(elementPath, callBack);
    }
  },500);
}

function load() {
    console.log("Loading plugin.");
    playButton.click();
    setup();
    $(".video-list-item").bind("click", function() {
        waitForElement("#progress", function() {
            waitForElement("#eow-title", load);
        });
    });
    $(".yt-lockup").bind("click", function() {
        waitForElement("#progress", function() {
            waitForElement("#eow-title", load);
        });
    });
}

(function() {
	'use strict';
    load();
})();
