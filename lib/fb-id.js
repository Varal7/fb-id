var request = require('request');
var cookie = require('cookies.txt');

var Facebook = function() {

};

Facebook.prototype.getId = function(pageUrl, cb) {

    cookie.parse('cookies.txt', function(jsonCookieObj){
      var cookieString = jsonCookieObj.reduce(function (pre, cookie) {
           pre.push(cookie.name + '=' + cookie.value);
         return pre;
       }, []).join(';');

      request({
        url: pageUrl,
        timeout: 60000,
        jar: request.jar(),
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.65 Safari/537.31',
          'Cookie': cookieString
        }
      }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var regularExpresionMatch = /fb:\/\/(group|page|profile)\/(\d{1,})/gi;
            var regularExpresionReplace = /fb:\/\/(group|page|profile)\//gi;
            var matchArray = body.match(regularExpresionMatch);

            if (matchArray && matchArray.length > 0) {
              cb(matchArray[0].replace(regularExpresionReplace, ''));
            }
            else {
              cb(0);
            }
        }
        else {
          cb(0);
        }
      });
    });
};

module.exports = Facebook;
