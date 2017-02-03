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
    var html="<h2>Found it!</h2>";
    html += "<code>" + data.id + "</code>";
    resultsDiv.html(html);
    resultsDiv.show();
  }).fail(function( jqxhr, textStatus, error ) {
    var html="<h2>Sorry, no results found</h2>";
    resultsDiv.html(html);
    resultsDiv.show();
  });
}
