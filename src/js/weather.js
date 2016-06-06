

angular.module("weather", [])
  .controller("WeatherController", function($scope, $http) {
    let initializing = true;
    $scope.$watch("search", function(val) {
      if (initializing) {
        setTimeout(function() { initializing = false; }, 0);
      } else {
        fetchCityState(val);
      }
    });

    var fetchCityState = (zip) => {
      if(zip)
        zip.length === 5 ?
          $http.get("http://maps.googleapis.com/maps/api/geocode/json?address=" + zip)
            .then(function (data) {
              fetchWeather(data);
            })
            .catch(function (err) {
              console.error("Error in fetchCityState");
            }) :
        console.error("Invalid zip!");
    };

    var fetchWeather = (lookupObj) => {
      const addressArr = lookupObj.data.results[0].formatted_address.split(", ");
      const zipPosition = addressArr[1].lastIndexOf(" ");
      const stateAbbr = addressArr[1].substring(0, zipPosition);
      const city = addressArr[0].replace(" ", "_");

      $http.get("http://api.wunderground.com/api/4fff4d1fab37ffe7/geolookup/conditions/q/" + stateAbbr + "/" + city + ".json")
        .then(function(response) {
          console.log(response.data.current_observation);
          $scope.current_observation = response.data.current_observation;
        })
        .catch(function (err) {
          console.error("Error in fetchWeather");
        });
    };
  });
