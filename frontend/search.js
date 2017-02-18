'use strict';

var searchInput = $('#search-input');
var resultsDiv = $('#results');
var linksDiv = $('#links');
var form = $('#form');
var apiUrl = 'https://api.fbid.varal7.fr/';
//var apiUrl = 'http://localhost:8001/';
resultsDiv.hide();
linksDiv.hide();

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
    var links = "<p>Related links:</p>";
    links += '<p><a href="https://www.facebook.com/search/' + data.id + '/photos-of" title="Photos for this person">Photos for this profile</p> ';
    links += '<p><a href="https://www.facebook.com/search/' + data.id + '/photos-tagged" title="Photos tagged for this person">Photos Tagged with this profile</p> ';
    links += '<p><a href="https://www.facebook.com/search/' + data.id + '/photos-commented" title="Photos commented by this person">Photos commented by this profile</p> ';
    links += '<p><a href="https://www.facebook.com/search/' + data.id + '/photos-liked" title="Photos liked by this person">Photos liked by this profile</p> ';
    links += '<p><a href="https://www.facebook.com/search/' + data.id + '/stories-liked" title="Posts liked by this person">Posts liked by this profile</p> ';
    links += '<p><a href="https://www.facebook.com/search/' + data.id + '/pages-liked" title="Pages liked by this person">Pages liked by this profile</p> ';
    links += '<p><a href="https://www.facebook.com/search/' + data.id + '/groups" title="Groups this person belongs to">Groups this profile belongs to</p> ';
    links += '<p><a href="https://www.facebook.com/search/' + data.id + '/events" title="Events person is going to">Events this profile is going to</p> ';
    links += '<p><a href="https://www.facebook.com/search/' + data.id + '/places-visited" title="Places this person has visited">Places this profile has visited</p> ';
    linksDiv.html(links);
    linksDiv.show();
  }).fail(function( jqxhr, textStatus, error ) {
    var html="<h2>Sorry, no results found</h2>";
    resultsDiv.html(html);
  });
}
