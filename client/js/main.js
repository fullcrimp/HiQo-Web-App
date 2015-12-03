
app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/load/load.file");

    $stateProvider
    .state('load', {
        // abstract: true,
        url: "/load",
        templateUrl: "partials/load.html"

    })

    .state('load.url', {
        url: "/load.url",
        templateUrl: "partials/load.url.html",
        controller: function($scope, fileReader, sourceImage, $http) {

            $scope.imageUrl = undefined;


            $scope.loadImage = function(){
                //   $scope.imageUrl = $('input.image-url').val();
                console.log($scope.imageUrl);
                sourceImage.set($scope.imageUrl);
                //   $http.get($scope.imageUrl).success(function(data){
                //     $scope.image = data;
                // });
            }
        }

    })

    .state('load.file', {
        url: "/load.file",
        templateUrl: "partials/load.file.html",
        controller: 'LoadController'
    })

    .state('mark', {
        url: "/mark",
        templateUrl: "partials/mark.html",
        controller: 'MarkController'
    })

    .state('find', {
        url: "/find",
        templateUrl: "partials/find.html"
    })

    .state('shop', {
        url: "/shop",
        templateUrl: "partials/shop.html",
        controller: function($scope) {
        }
    });
});
