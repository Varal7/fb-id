'use strict';

var searchInput = $('#search-input');
var resultsDiv = $('#results');
var form = $('#form');
var apiUrl = 'https://api.fbid.varal7.fr/';
//var apiUrl = 'http://localhost:8001/';
resultsDiv.hide();

form.on('submit', function() {
    var url = searchInput.val();
    var html = '<img src="img/giphy.gif" alt="Loading..." />';
    resultsDiv.html(html);
    resultsDiv.show();
    displayId(url);
    return false;
});

function displayId(url) {
  console.log("Search fb id for", url);
  $.getJSON(apiUrl + '?url=' + url, function (data) {
    var html="<h2>Found it!</h2>";
    html += "<br/>";
    html += "<h1><code>" + data.id + "</code></h1>";
    resultsDiv.html(html);
  }).fail(function( jqxhr, textStatus, error ) {
    var html="<h2>Sorry, no results found</h2>";
    resultsDiv.html(html);
  });
}
