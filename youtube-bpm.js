// ==UserScript==
// @name         Youtube BPM Meter
// @namespace    http://tampermonkey.net/
// @version      1
// @description  try to take over the world!
// @author       Greeniac916
// @match        https://www.youtube.com/watch*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==
var playButton = $(".ytp-play-button");
var bpmDelay = 0;
var beats = 0;
var interval;

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
	//Bind Submit and Reset Buttons
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
(function() {
	'use strict';
	playButton.click();
	setup();
})();
