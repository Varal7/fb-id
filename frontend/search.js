'use strict';

var searchInput = $('#search-input');
var resultsDiv = $('#results');
var form = $('#form');
//var apiUrl = 'http://api.fbid.varal7.fr/';
var apiUrl = 'http://localhost:8001/';
resultsDiv.hide();

form.on('submit', function() {
    var url = searchInput.val();
    displayId(url);
    return false;
});

function displayId(url) {
  console.log("Search fb id for", url);
  $.getJSON(apiUrl + '?url=' + url, function (data) {
    var html=data;
    resultsDiv.html(html);
    lyricsDiv.show();
  });
}
