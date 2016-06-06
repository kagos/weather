angular.module("fetchCityState", [])
  .controller("FetchCityStateController", function($scope, $http) {
    var fetchCityState = (zip) => {
      if(zip)
        zip.length === 5 ?
          $http.get("http://maps.googleapis.com/maps/api/geocode/json?address=" + zip)
            .then(function (data) {
              console.log(data);
              //fetchWeather(data);
            })
            .catch(function (err) {
              console.error("Error in fetchCityState");
            }) :
        console.error("Invalid zip!");
    };
  });
