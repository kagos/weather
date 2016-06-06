angular.module('weather', [])
  .controller('WeatherController', ['$scope', '$http', function($scope, $http) {
    var initializing = true;
    $scope.cities = {};
    $scope.$watch('search', function(val) {
      if (initializing) {
        setTimeout(function() { initializing = false; }, 0);
      } else {
        fetchCityState(val);
        $scope.search = "";
      }
    }
  );

  var fetchCityState = function(zip) {
    if(zip)
      zip.length === 5 ?
        $http.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + zip)
          .then(function(lookupObj) {
            fetchWeather(lookupObj);
          })
          .catch(function (err) {
            console.error('Error in fetchCityState');
          }) :
      console.error('Invalid zip!');
  };

  var fetchWeather = function(lookupObj) {
    var formatted_address = lookupObj.data.results[0].formatted_address;
    var addressArr = lookupObj.data.results[0].formatted_address.split(', ');
    var zipPosition = addressArr[1].lastIndexOf(' ');
    var zip = addressArr[1].substring(zipPosition, addressArr[1].length);
    var stateAbbr = addressArr[1].substring(0, zipPosition);
    var city = addressArr[0].replace(' ', '_');

    $http.get('http://api.wunderground.com/api/4fff4d1fab37ffe7/geolookup/conditions/q/' + stateAbbr + '/' + city + '.json')
      .then(function(response) {
        $scope.cities[zip] = {
          formatted_address: formatted_address,
          weather: response.data.current_observation.weather,
          temperature: response.data.current_observation.temperature_string,
          icon: "http://icons.wxug.com/i/c/k/" + response.data.current_observation.icon + ".gif"
        };
      })
      .catch(function (err) {
        console.error('Error in fetchWeather');
      });
    };
  }]);
