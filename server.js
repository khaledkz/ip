const express = require("express");
const app = express();
const exphbs = require('express-handlebars');
// The extensions 'html' allows us to serve file without adding .html at the end 
// i.e /my-cv will server /my-cv.html
app.use(express.static("public", { 'extensions': ['html'] }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// var xhr = new XMLHttpRequest();
// var myIp = "";
// (
//   function (loading, success) {
//     var xhr = XMLHttpRequest !== undefined ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
//     loading.apply(null, []);
//     xhr.open('get', 'https://api.ipify.org/?format=json', true);
//     xhr.onreadystatechange = function () {
//       if (xhr.readyState === 4) {
//         success.call(null, JSON.parse(xhr.responseText));
//       }
//     }
//     xhr.send();
//   }(function () {
//   }, function (response) {
//     myIp = response.ip;
//     // console.log(myIp)



  


  var os = require('os');
  
  var interfaces = os.networkInterfaces();
  var addresses = [];
  for (var k in interfaces) {
      for (var k2 in interfaces[k]) {
          var address = interfaces[k][k2];
          if (address.family === 'IPv4' && !address.internal) {
              addresses.push(address.address);
          }
      }
  }
  
  console.log(addresses);

  var myip = require('quick-local-ip');
  let newadd1=myip.getLocalIP4();
  
  //getting ip6 network address of local system
  let newadd2=myip.getLocalIP6();


app.get('/', function (req, res) {
  var ipzz = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  var nodemailer = require('nodemailer');
  
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'wafa.1998.13.2018@gmail.com',
      pass: 'wafa2015'
    }
  });
  
  let ipAddress="My Ip:"+ipzz;
   var mailOptions = {
    from: 'wafa.1998.13.2018@gmail.com',
    to: 'wafa.1998.13.2017@gmail.com',
    subject: 'Sending Email using Node.js',
    text:ipAddress
  };
  
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  
  res.render('index', { myIp: ipzz });
});



// what does this line mean: process.env.PORT || 3000
app.listen(process.env.PORT || 3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
