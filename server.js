const express = require("express");
const app = express();
const exphbs  = require('express-handlebars');
 // The extensions 'html' allows us to serve file without adding .html at the end 
// i.e /my-cv will server /my-cv.html
app.use(express.static("public", {'extensions': ['html']}));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');



var getNetworkIP = (function () {
  var ignoreRE = /^(127\.0\.0\.1|::1|fe80(:1)?::1(%.*)?)$/i;

  var exec = require('child_process').exec;
  var cached;    
  var command;
  var filterRE;

  switch (process.platform) {
  // TODO: implement for OSs without ifconfig command
  case 'darwin':
       command = 'ifconfig';
       filterRE = /\binet\s+([^\s]+)/g;
       // filterRE = /\binet6\s+([^\s]+)/g; // IPv6
       break;
  default:
       command = 'ifconfig';
       filterRE = /\binet\b[^:]+:\s*([^\s]+)/g;
       // filterRE = /\binet6[^:]+:\s*([^\s]+)/g; // IPv6
       break;
  }

  return function (callback, bypassCache) {
       // get cached value
      if (cached && !bypassCache) {
          callback(null, cached);
          return;
      }
      // system call
      exec(command, function (error, stdout, sterr) {
          var ips = [];
          // extract IPs
          var matches = stdout.match(filterRE);
          // JS has no lookbehind REs, so we need a trick
          for (var i = 0; i < matches.length; i++) {
              ips.push(matches[i].replace(filterRE, '$1'));
          }

          // filter BS
          for (var i = 0, l = ips.length; i < l; i++) {
              if (!ignoreRE.test(ips[i])) {
                  //if (!error) {
                      cached = ips[i];
                  //}
                  callback(error, ips[i]);
                  return;
              }
          }
          // nothing found
          callback(error, null);
      });
  };
})();

let myip="";
getNetworkIP(function (error, ip) {
  myip=ip;
  console.log(ip);
  if (error) {
      console.log('error:', error);
  }
}, false);


app.get('/', function (req, res) {
  res.render('index',{
    myip:myip
  });
});



// what does this line mean: process.env.PORT || 3000
app.listen(process.env.PORT || 3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});