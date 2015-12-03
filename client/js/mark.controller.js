
// function($scope, $window, $state, sourceImage) {
app.controller('MarkController', ['$scope', '$window', '$state', 'sourceImage', function ($scope, $window, $state, sourceImage) {

    $scope.srcImage = sourceImage.get();

    console.log($scope.srcImage);
    if (!$scope.srcImage) {
        $state.go('load.file');
    }
    // resize of the canvas
    // var w = angular.element($window);
    // $scope.$watch(function () {
    //     return {
    //         'h': w.height(),
    //         'w': w.width()
    //     };
    // }, function (newVal, oldVal) {
    //     $scope.srcImage = '';
    //
    //     $('.cropArea').width(newVal.w).height(newVal.h);//.offset({ top: 20, left: 20 });
    //     $scope.srcImage = sourceImage.get();
    // }, true);

    $scope.srcImage = sourceImage.get();
    $scope.myCroppedImage='';

}]);
