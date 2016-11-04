
var app = {};

app.deviceInfo = require('./moduls/_deviceInfo');
app.domHandler = require('./moduls/_domHandler');


window.localStorage.deviceData = JSON.stringify(app.deviceInfo.init());
app.domHandler.init(window.localStorage.deviceData);



setTimeout(function(){
  //console.log("ejecuto domheandler");
  app.domHandler.getLocation(window.localStorage.deviceData);
  console.log(JSON.parse(window.localStorage.deviceData));
}, 1500);


window.addEventListener("orientationchange", function() {
  window.location = window.location.href;
}, false);
