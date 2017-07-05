//background script, event mode
//message passed between background - defaultpage - iframes

(function(){

	//console.log("Hello!-1");

	chrome.storage.sync.set({landValue: 0, improvementValue: 0, totalValue: 0, curTabID: null});

	chrome.browserAction.onClicked.addListener(function (activeTab) {

		//open a link
		var newURL = "http://idp.gvfv.clareitysecurity.net/idp/Authn/UserPassword";
		//var newURL = "http://stackoverflow.com/"
	  	chrome.tabs.create({ url: newURL });

	 	//console.log("Hello!");

	 	//alert("hello");

  	}); 

  	
	chrome.webNavigation.onCompleted.addListener(function(details){
		console.log("Completed!");
		//alert("Completed!");

	}, {
		url: [{hostContains: '.paragonrels.com'}]
	});

	//receive message from iframes, then transfer the message to Main Page content script
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){

			console.log("eventPage got a message", request);

			//message from Warning iframe
	        if(request.todo == "warningMessage"){

	            console.log("I got the warning message!");
	            //pass the message to defaultpage(Main Home Page)
	            chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
					chrome.tabs.sendMessage(tabs[0].id, {todo: "ignoreWarning"})
				});
	        }

	        //message from Logout iframe
	        if(request.todo == "logoutMessage"){

	            console.log("I got logout message!");
	            //pass the message to defaultpage(Main Home Page)
	            chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
					chrome.tabs.sendMessage(tabs[0].id, {todo: "logoutMLS"})
				});
	        }

	        if(request.todo == "switchTab"){

	        	console.log("I got switch Tab message!");
	            //pass the message to defaultpage(Main Home Page)
	            chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
					chrome.tabs.sendMessage(tabs[0].id, {todo: "switchTab"})
				});

				sendResponse("switchTab done!!!");
	        }

	        if(request.todo == "taxSearch"){

	        	console.log("I got tax search command!");

	        	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
					chrome.tabs.sendMessage(tabs[0].id, {todo: "taxSearch"})
				});

				sendResponse("tax Search Command sent out!");
	        }

	        if(request.todo == "updateTopLevelTabMenuItems"){

	        	console.log("I got Update Top Level Tab Menu Items Command!");

	        	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
					chrome.tabs.sendMessage(tabs[0].id, {todo: "updateTopLevelTabMenuItems"})
				});

				sendResponse("Update Top Level Tab Menu Items Command sent out!");
	        }

	        if(request.todo == "readCurTabID"){

	        	console.log("New Command: readCurTabID");

	        	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
					chrome.tabs.sendMessage(tabs[0].id, {todo: "readCurTabID"})
				});

				sendResponse("readCurTabID Command sent out!");
	        }
	});

	//End of Main Function

}());



