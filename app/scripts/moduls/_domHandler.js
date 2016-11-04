var domHandler = (function() {

  var ui = {
    "body" : '.di_JS_body',
    "browser": {
      "name" : '.di_browserData__name span',
      "version" : '.di_browserData__version span',
      "layout" : '.di_browserData__engine span',
      "lang" : '.di_browserData__lang span'
    },
    "Os" : {
      "family" : ".di_operatingSystemData__family span",
      "version" : ".di_operatingSystemData__version span",
      "architecture" : ".di_operatingSystemData__architecture span",
      "platform" : ".di_operatingSystemData__platform span"
    },
    "size": {
      "viewPortWidth" : ".di_JS_browserSize__viewPortWidth span.di_JS_browserSize__data",
      "availableWidth" : ".di_JS_browserSize__availableWidth span.di_JS_browserSize__data",
      "viewPortHeight" : ".di_JS_browserSize__viewPortHeight span.di_JS_browserSize__data",
      "availableHeight" : ".di_JS_browserSize__availableHeight span.di_JS_browserSize__data"
    },
    "screen": {
      "width": ".di_JS_screenData__screenWidth span.di_JS_screenData__data",
      "height": ".di_JS_screenData__screenHeight span.di_JS_screenData__data",
      "pixelDepth": ".di_JS_screenData__pixelDepth span.di_JS_screenData__data",
      "colorDepth": ".di_JS_screenData__colorDepth span.di_JS_screenData__data",
      "pixelRatio": ".di_JS_screenData__pixelRatio span.di_JS_screenData__data"
    },
    "orientation": {
      "type" : ".di_JS_orientationData__orientationType span.di_JS_orientationData__data",
      "angle" : ".di_JS_orientationData__orientationAngle span.di_JS_orientationData__data",
      "rotatedTo" : ".di_JS_orientationData__orientationRotatedTo span.di_JS_orientationData__data",
    },
    "device": {
      "manufacturer": ".di_JS_deviceata__deviceManufacturer span.di_JS_deviceata__data",
      "product": ".di_JS_deviceata__deviceProduct span.di_JS_deviceata__data",
    },
    "location": {
      "latitude": ".di_JS_locationData__latitude span.di_JS_locationData__data",
      "longitude": ".di_JS_locationData__longitude span.di_JS_locationData__data",
      "altitude": ".di_JS_locationData__altitude span.di_JS_locationData__data",
      "speed": ".di_JS_locationData__speed span.di_JS_locationData__data",
      "accuracy": ".di_JS_locationData__accuracy span.di_JS_locationData__data",
      "map": ".di_locationData__mapContainer"
    }
  };

  var knowedBrowser = [
      "Chrome",
      "Android-Browser",
      "Chrome-Mobile",
      "Microsoft-Edge",
      "IE",
      "IE-Mobile",
      "Firefox",
      "Safari",
      "Opera"
  ];

  var knowedOs = [
    "Windows-NT",
    "Windows-Phone",
    "OS-X",
    "iOS",
    "Android",
    "Ubuntu-Chromium"
  ];

  var getData = function(node) {
    createClass(node);
  };

  var createClass = function(node, type) {
    node =  node.replace(" ", "-");

    if (removeDefaultIcon(type, node)) {
      var classToRemove = 'di_' + type + '__default';
      $(ui.body).removeClass(classToRemove);
    }

    var newClass = 'di_' + type + '__' + node;
    return newClass;
  }

  var removeDefaultIcon = function(type, name) {
    var response = null;
    if (type=== "browser") {
      response = isInArray(knowedBrowser.indexOf(name));
    };
    if (type=== "Os") {
      response = isInArray(knowedOs.indexOf(name));
    };
    return response;
  };

  /**
   * isInArray
   * description: checkea si el valor resivido,
   *              existe como posicion en la longitud del array.
   *
   * @param  {number}  position
   * @return {Boolean}
   */
  var isInArray = function(position) {
    var areThere = null;
    if (position != -1) {
      areThere = true
    } else {
      areThere = false;
    }
    return areThere;
  };

  var setNewClass = function(newClasstoAdd, targetElement) {
    $(targetElement).addClass(newClasstoAdd);
  };


  var printData = function(nodo, target) {
    try {
      $(target).text(nodo.toString());
    } catch (e) {
      return false;
    }
  };

  /**
   * [setIconOrientation description]
   * @param {[type]} obj [description]
   */
  var setIconOrientation = function(obj) {
    if (obj.angle == 90) {
      $(".di_header__logo .fa-tablet").addClass("fa-rotate-270");
      $(".di_header__logo .fa-mobile").addClass("fa-rotate-270");
    } else if (obj.angle == 180) {
      $(".di_header__logo .fa-tablet").addClass("fa-rotate-180");
      $(".di_header__logo .fa-mobile").addClass("fa-rotate-180");
    } else if (obj.angle == -90 || obj.angle == 270) {
      $(".di_header__logo .fa-tablet").addClass("fa-rotate-90");
      $(".di_header__logo .fa-mobile").addClass("fa-rotate-90");
    } else {
    }
  }

  var showMap = function(data) {
    var latLong = data.LocationData.latitude + ','+ data.LocationData.longitude;
    var mapSize = (data.browser.availableWidth - 32);

    if (mapSize >= 453) {mapSize = 453}
    var imgToAdd = 'url("https://maps.googleapis.com/maps/api/staticmap?center=' + latLong + '&zoom=17&size=' + mapSize + 'x' + mapSize + '")';
    mapSize = mapSize + "px";
    //$(ui.location.map).append(imgToAdd);
    $(ui.location.map).css({
      width: '100%',
      height: mapSize,
      backgroundImage: imgToAdd
    });

  }

  var setLocation = function(storageString) {
    var data = JSON.parse(storageString);
    var d = new Date();
    data.timestamp = d.getTime();

    if (window.position != null) {
      data.LocationData = window.position.coords;
    } else {
      data.LocationData = {};
      data.ip = {};
      var latLong = window.ip.loc.split(',');
      data.ipData = window.ip;
      data.LocationData.latitude = latLong[0];
      data.LocationData.longitude = latLong[1];
    }

    /**
     * Set LocationData Data
     */
    printData(data.LocationData.latitude, ui.location.latitude);
    printData(data.LocationData.longitude, ui.location.longitude);
    printData(data.LocationData.altitude, ui.location.altitude);
    printData(data.LocationData.speed, ui.location.speed);
    printData(data.LocationData.accuracy, ui.location.accuracy);
    showMap(data);
    window.localStorage.deviceData = JSON.stringify(data);
  }

  var init = function(storageString) {
    var data = JSON.parse(storageString);
    //console.log(data);

    /**
     * Set Icons
     */
    setNewClass(createClass(data.name, 'browser'), ui.body);
    setNewClass(createClass(data.os.family, 'Os'), ui.body);
    setNewClass(createClass(data.deviceType, 'logo'), ui.body);
    setIconOrientation(data.screen.orientation);


    /**
     * Set Browser Data
     */
    printData(data.name, ui.browser.name);
    printData(data.version, ui.browser.version);
    printData(data.layout, ui.browser.layout);
    printData(data.browserLang, ui.browser.lang);

    /**
     * Set OS Data
     */
    printData(data.os.family, ui.Os.family);
    printData(data.os.version, ui.Os.version);
    printData(data.os.platform, ui.Os.platform);
    printData(data.os.architecture, ui.Os.architecture);

    /**
     * Browser Sizes
     */
    printData(data.browser.viewportWidth, ui.size.viewPortWidth);
    printData(data.browser.availableWidth, ui.size.availableWidth);
    printData(data.browser.viewportHeight, ui.size.viewPortHeight);
    printData(data.browser.viewportWidth, ui.size.availableHeight);

    /**
     * Set OS Data
     */
    printData(data.screen.width, ui.screen.width);
    printData(data.screen.height, ui.screen.height);
    printData(data.screen.pixelDepth, ui.screen.pixelDepth);
    printData(data.screen.colorDepth, ui.screen.colorDepth);
    printData(data.screen.pixelRatio, ui.screen.pixelRatio);

    /**
     * Orientation
     */
    printData(data.screen.orientation.type, ui.orientation.type);
    printData(data.screen.orientation.angle, ui.orientation.angle);
    printData(data.screen.orientation.rotatedTo, ui.orientation.rotatedTo);

    /**
     * DEVICE
     */
    printData(data.manufacturer, ui.device.manufacturer);
    printData(data.product, ui.device.product);

  };

  return {
    init : init,
    getLocation : setLocation
  }
})();

module.exports = domHandler;
