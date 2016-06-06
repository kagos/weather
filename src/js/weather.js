

angular.module("weather", [])
  .controller("WeatherController", function($scope, $http) {
    $scope.$watch("search", function() {
      if (initializing) {
        $timeout(function() { initializing = false; });
      } else {
        fetchWeather();
      }
    });

    function fetchWeather(){
      $http.get("http://api.wunderground.com/api/4fff4d1fab37ffe7/geolookup/conditions/q/IA/Cedar_Rapids.json")
        .then(function(response) { $scope.details = response.data; });
    }
  });
