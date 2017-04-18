var index = angular.module('index', []);
var threeKingdoms = angular.module('threeKingdoms', []);
var culture_tourism = angular.module('culture_tourism', []);
var ancient_city = angular.module('ancient_city', []);
var expert = angular.module('expert', []);

function headerCtrl($scope) {
    $scope.headers =
        [ { name: 'header.html', url: 'partials/header.html'}];
    $scope.header = $scope.headers[0];
}

function footerCtrl($scope) {
    $scope.footers =
        [ { name: 'footer.html', url: 'partials/footer.html'}];
    $scope.footer = $scope.footers[0];
}