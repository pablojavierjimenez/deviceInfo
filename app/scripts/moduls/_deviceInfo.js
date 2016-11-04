var DeviceInfo = (function () {

        var deviceData = {};

        var browser = {
          'viewportWidth'   : Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
          'viewportHeight'  : Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
          'availableWidth'  : document.documentElement.clientWidth,
          'availableHeight' : document.documentElement.clientHeight,
          'width'           : window.innerWidth,
          'Height'          : window.innerHeight
        };

        var getDeviceType = function(screen) {
          var type = null;
          if (screen.width > 1024 && screen.height > 768) {
            type = "desktop";
          }

          if (screen.width > 1024 && screen.height <= 768) {
            type = "laptop";
          }

          if (screen.width <= 768 && screen.height >= 1024) {
            type = "tablet";
          }

          if (screen.width == 1024 && screen.height == 768) {
            type = "tablet";
          }

          if (screen.width < 767 && screen.height <= 768) {
            type = "mobile";
          }
          return type;
        };

        /**
         * [createScreenObject description]
         * @param  {[type]} screen [description]
         * @return {[type]}        [description]
         */
        var createScreenObject = function(screen) {
          var oo = window.screen;
          var toPrint={};
          var i =0;
          for(var key in oo) {
            var value = oo[key];
            if (typeof(value) !== "object" ) {
              toPrint[key] = value ;
            }
          }

          toPrint.pixelRatio = window.devicePixelRatio;
          toPrint.orientation = createDeviceOrientation();
          return toPrint;
        };

        var createDeviceOrientation = function() {
          var obj = null;
          var toPrint= null;
          if (window.screen.orientation == undefined) {
            toPrint = {
              "angle" : window.orientation,
              "type" : getOrientationType(window.orientation),
              "rotatedTo": getOrientationDirection(window.orientation)
            };
          } else {
            obj = window.screen.orientation;
            toPrint= {
              "rotatedTo": getOrientationDirection(window.screen.orientation.angle)
            };
            for(var key in obj) {
              var value = obj[key];
              if (typeof(value) !== "object" || typeof(value) !== "function") {
                toPrint[key] = key ;
              }
              toPrint[key] = value ;
            }
          }
          return toPrint;
        }

        /**
         * [getOrientationType description]
         * @param  {[type]} angle [description]
         * @return {[type]}       [description]
         */
        var getOrientationType = function(angle) {
          var type = null;
          if (angle == 0) {
            type = "portrait-primary";
          } else {
            type = "landscape-primary";
          }
          return type;
        };

        /**
         * [getOrientationDirection description]
         * @param  {[type]} angle [description]
         * @return {[type]}       [description]
         */
        var getOrientationDirection = function(angle) {
          var type = null;
          if (angle == 90) {
            type = "left";
          } else if (angle == -90 || angle == 270) {
            type = "right";
          } else {
            type = "none";
          }
          return type;
        };

        /**
         * @param  {object}
         * @description toma los datos de el plugin platform.js y recrea un objeto de
         *              tipo json, es decir elimina los metodos y devuelve
         *              solo los datos planos en formato de texto.
         * @return {object}
         */
        var pushData = function (Obj, targetObject) {
          for(var key in Obj) {
              var element;
              var value = Obj[key];
              if (typeof(value) == 'function' ) {
                //element = key + ' : is a function';
              } else if (typeof(value) == "object" ) {
                if (value === null) {
                  //console.log(key, 'is null');
                  targetObject[key] = null;
                } else {
                  targetObject[key] = isString(value);
                }
              } else {
                element = key + ' : ' + value ;
                targetObject[key] = value;
              }
          }
          return targetObject;
        };

        /**
         * [isString description: checkea si una variable es un Objeto, si lo es lo recorre
         *                       y elimina los metodos que contien, y retorna un objeto limpio de metodos.
         * @param  {Object}  Obj [description]
         * @return {Boolean}     [description]
         */
        var isString = function (Obj) {
          var purgedObj = {};
          //console.log(Obj);
          for(var key in Obj) {
              var value = Obj[key];
              if (typeof(value) == 'function' ) {
                //console.log(key, 'is a function');
              } else {
                purgedObj[key] = value;
              }
          }
          return purgedObj;
        };

        $.getJSON('http://ipinfo.io', function(data){
          window.ip = data;
        });


        function getLocation() {
          window.position = null;
            if (navigator.geolocation) {
                console.log(navigator.geolocation.getCurrentPosition(showPosition));
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }
        function showPosition(position) {
          window.position = position;
          return window.position;
        }
        getLocation();

        var init = function() {
          pushData(platform, deviceData);
          deviceData.browser = browser;
          deviceData.browserLang = navigator.language;
          deviceData.deviceType = getDeviceType(window.screen);
          deviceData.screen = createScreenObject(window.screen);
          deviceData.os.platform = navigator.platform;
          return deviceData;
        };

        return {
          init: init
        }
})();

module.exports = DeviceInfo;
