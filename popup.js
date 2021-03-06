// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 **/
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.  // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

/**
 * @param {string} searchTerm - Search term for Google Image search.
 * @param {function(string,number,number)} callback - Called when an image has
 *   been found. The callback gets the URL, width and height of the image.
 * @param {function(string)} errorCallback - Called when the image is not found.
 *   The callback gets a string that describes the failure reason.
 */
function getImageUrl(searchTerm, callback, errorCallback) {
  // Google image search - 100 searches per day.
  // https://developers.google.com/image-search/
  var searchUrl = 'https://ajax.googleapis.com/ajax/services/search/images' +
    '?v=1.0&q=' + encodeURIComponent(searchTerm);
 var x = new XMLHttpRequest();
  x.open('GET', searchUrl);
  // The Google image search API responds with JSON, so let Chrome parse it.
  x.responseType = 'json';
  x.onload = function() {
    // Parse and process the response from Google Image Search.
    var response = x.response;
    if (!response || !response.responseData || !response.responseData.results ||
        response.responseData.results.length === 0) {
      errorCallback('No response from Google Image search!');
      return;
    }
    var firstResult = response.responseData.results[0];
    // Take the thumbnail instead of the full image to get an approximately
    // consistent image size.
    var imageUrl = firstResult.tbUrl;
    var width = parseInt(firstResult.tbWidth);
    var height = parseInt(firstResult.tbHeight);
    console.assert(
        typeof imageUrl == 'string' && !isNaN(width) && !isNaN(height),
        'Unexpected respose from the Google Image Search API!');
    callback(imageUrl, width, height);
  };
  x.onerror = function() {
    errorCallback('Network error.');
  };
  x.send();
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}


function checkExistSearchString(searchString, callback, errorCallback) {
  // Google image search - 100 searches per day.
 

	var searchUrl = 'https://hunterzero.iriscouch.com/searchstring/_design/query/_view/bySearchString?reduce=true&key="' + searchString + '"';

 var x = new XMLHttpRequest();
  x.open('GET', searchUrl);
  // The Google image search API responds with JSON, so let Chrome parse it.
  x.responseType = 'application/json';
  x.setRequestHeader('Content-Type', 'application/json');
  x.onload = function() {
    // Parse and process the response from Google Image Search.
    var response = JSON.parse(x.response);
    var firstResult = 0;
    
    if (!response ) {
      errorCallback('No response from Iris Couch!');
      return;
    }
    if (response.rows.length) {
       firstResult = response.rows[0].value;
		}
    // Take the thumbnail instead of the full image to get an approximately
    // consistent image size.
    callback(firstResult);
  };
  x.onerror = function() {
    errorCallback('Network error.');
  };
  x.send();
}


function checkExistImageUrl(imageurl, callback, errorCallback) {
  // Google image search - 100 searches per day.
 

	var searchUrl = 'https://hunterzero.iriscouch.com/image/_design/query/_view/byUrl?reduce=true&key="' + imageurl + '"';

 var x = new XMLHttpRequest();
  x.open('GET', searchUrl);
  // The Google image search API responds with JSON, so let Chrome parse it.
  x.responseType = 'application/json';
  x.setRequestHeader('Content-Type', 'application/json');
  x.onload = function() {
    // Parse and process the response from Google Image Search.
    var response = JSON.parse(x.response);
    var firstResult = 0;
    
    if (!response ) {
      alert('No response from Iris Couch!');
      return;
    }
    if (response.rows.length) {
       firstResult = response.rows[0].value;
		}
    // Take the thumbnail instead of the full image to get an approximately
    // consistent image size.
    callback(firstResult);
  };
  x.onerror = function() {
    alert('Network error.');
  };
  x.send();
}





function checkExistUrl(url, callback, errorCallback) {
  // Google image search - 100 searches per day.
 

	var searchUrl = 'https://hunterzero.iriscouch.com/videos/_design/query/_view/byUrl?reduce=true&key="' + url + '"';

 var x = new XMLHttpRequest();
  x.open('GET', searchUrl);
  // The Google image search API responds with JSON, so let Chrome parse it.
  x.responseType = 'application/json';
  x.setRequestHeader('Content-Type', 'application/json');
  x.onload = function() {
    // Parse and process the response from Google Image Search.
    var response = JSON.parse(x.response);
    var firstResult = 0;
    
    if (!response ) {
      errorCallback('No response from Iris Couch!');
      return;
    }
    if (response.rows.length) {
       firstResult = response.rows[0].value;
		}
    // Take the thumbnail instead of the full image to get an approximately
    // consistent image size.
    callback(firstResult);
  };
  x.onerror = function() {
    errorCallback('Network error.');
  };
  x.send();
}



document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {

      
    var res = url.match(/xvideos/g);
    var site = 0;
    var doc_type = "none";
    if (url.match(/xvideos/g)) {
        site = 1;
        doc_type = "xvideos";
		} else if (url.match(/exhentai/g)) {
        site = 2;
        doc_type = "exhentai";
		} else if (url.match(/tv5/g)) {
        site = 3;
        doc_type = "tv5";
		} else if (url.match(/youtube/g)) {
        site = 4;
        url = url.replace(/&/g , "^");
        doc_type = "youtube";
	
		} else {
       site = 0;
		}




    if (site) {
      renderStatus('Checking duplicates for \n ' + url );
      checkExistUrl(url, function(resvalue) {

          if  (resvalue) {
      			renderStatus('Duplicate exists!!!\n ' + url)
          } else {

  		 uuid =  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    		return v.toString(16);
});

  			renderStatus('Current url: ' + url );
        var data = {};
        data.url = url;
        data.type = doc_type;

    		var postUrl = 'https://hunterzero.iriscouch.com/videos/' + uuid;
 				var x = new XMLHttpRequest();
  			x.open('PUT', postUrl);
  			x.responseType = 'json';
  			x.setRequestHeader('Content-Type', 'application/json');
  			x.onloadend = function() {
    		// Parse and process the response from Google Image Search.
    			renderStatus('Uploaded ' + uuid);
  			};
  			x.onerror = function() {
    			renderStatus('Network error.');
  			};
  			x.send(JSON.stringify(data));

					}



    }, function(errorMessage) {
      renderStatus('Cannot display image. ' + errorMessage);
    });




    } else {

  			renderStatus('Error!!! not xvideos: ' + url );
    }
    
     
  });
});


function addTextToCouch(info)
{
 var searchstring = info.selectionText;

 	checkExistSearchString(searchstring, function(resvalue) {
  	if  (resvalue) {
      var a = 1;
   	} else {
  		 uuid =  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    		return v.toString(16);
});

        var data = {};
        data.url = searchstring;
        data.type = 'searchName';

    		var postUrl = 'https://hunterzero.iriscouch.com/searchstring/' + uuid;
 				var x = new XMLHttpRequest();
  			x.open('PUT', postUrl);
  			x.responseType = 'json';
  			x.setRequestHeader('Content-Type', 'application/json');
  			x.onloadend = function() {
    		// Parse and process the response from Google Image Search.
    		//	renderStatus('Uploaded ' + uuid);
  			};
  			x.onerror = function() {
    			alert('Network error.');
  			};
  			x.send(JSON.stringify(data));

			}

    }, function(errorMessage) {
      alert('Cannot insert' + errorMessage);
    });

}


function addImageToCouch(info)
{
 var imageUrl = info.srcUrl;
 uuid =  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
     var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
     return v.toString(16);
     });

 var data = {};
 data.url = imageUrl;
 data.type = 'imageUrl';

 var postUrl = 'https://hunterzero.iriscouch.com/image/' + uuid;
 var x = new XMLHttpRequest();
 x.open('PUT', postUrl);
 x.responseType = 'json';
 x.setRequestHeader('Content-Type', 'application/json');
 x.onloadend = function() {
   // Parse and process the response from Google Image Search.
   //	renderStatus('Uploaded ' + uuid);
   };
 x.onerror = function() {
    			alert('Network error.');
  			};
 x.send(JSON.stringify(data));

}

function addImageToCouchx(info)
{
 var imageUrl = info.srcUrl;
 uuid =  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
     var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
     return v.toString(16);
     });

 var data = {};
 data.url = imageUrl;
 data.type = 'imageUrlX';

 var postUrl = 'https://hunterzero.iriscouch.com/image/' + uuid;
 var x = new XMLHttpRequest();
 x.open('PUT', postUrl);
 x.responseType = 'json';
 x.setRequestHeader('Content-Type', 'application/json');
 x.onloadend = function() {
   // Parse and process the response from Google Image Search.
   //	renderStatus('Uploaded ' + uuid);
   };
 x.onerror = function() {
    			alert('Network error.');
  			};
 x.send(JSON.stringify(data));

}





chrome.contextMenus.create({title: "Add name to couch", contexts:["selection"], onclick: addTextToCouch});

chrome.contextMenus.create({title: "Add image url to couch", contexts:["image"], onclick: addImageToCouch});
//chrome.contextMenus.create({title: "Add image urlx to couch", contexts:["image"], onclick: addImageToCouchx});
