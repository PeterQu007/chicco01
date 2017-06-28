/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	"use strict";

	//background script, event mode
	//message passed between background - defaultpage - iframes

	(function () {

		//console.log("Hello!-1");

		chrome.browserAction.onClicked.addListener(function (activeTab) {

			//open a link
			var newURL = "http://idp.gvfv.clareitysecurity.net/idp/Authn/UserPassword";
			//var newURL = "http://stackoverflow.com/"
			chrome.tabs.create({ url: newURL });

			//console.log("Hello!");

			//alert("hello");
		});

		chrome.webNavigation.onCompleted.addListener(function (details) {
			console.log("Completed!");
			//alert("Completed!");
		}, {
			url: [{ hostContains: '.paragonrels.com' }]
		});

		//receive message from iframes, then transfer the message to Main Page content script
		chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

			console.log("eventPage got a message", request);

			//message from Warning iframe
			if (request.todo == "warningMessage") {

				console.log("I got the warning message!");
				//pass the message to defaultpage(Main Home Page)
				chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
					chrome.tabs.sendMessage(tabs[0].id, { todo: "ignoreWarning" });
				});
			}

			//message from Logout iframe
			if (request.todo == "logoutMessage") {

				console.log("I got logout message!");
				//pass the message to defaultpage(Main Home Page)
				chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
					chrome.tabs.sendMessage(tabs[0].id, { todo: "logoutMLS" });
				});
			}

			if (request.todo == "switchTab") {

				console.log("I got switch Tab message!");
				//pass the message to defaultpage(Main Home Page)
				chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
					chrome.tabs.sendMessage(tabs[0].id, { todo: "switchTab" });
				});

				sendResponse("switchTab done!!!");
			}
		});

		//End of Main Function
	})();

/***/ })
/******/ ]);