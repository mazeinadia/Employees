app.controller('cardController', function ($compile, $scope) {

    $scope.positions = [
        {
            text: 'позиция'
        }
    ];


    $scope.data = {};



    /*$scope.getCard = function() {
        console.log($scope.data.changingNeeded);
        if ($scope.data.changingNeeded!== undefined) {
            return '<card-directive></card-directive>'
        }
    };*/

    $scope.additionNeeded = function () {
        console.log('try to add');
        let mode = $scope.data.mode;
        console.log(mode);
        let card = angular.element('<card-directive mode="' + mode + '"></card-directive>');
        console.log(card);
        let content = angular.element(document.querySelector('.content'));
        console.log(content);
        content.append(card);
        $compile(card)($scope);
    };

    $scope.changingNeeded = function (key) {
        console.log(key);
        console.log($scope.data.checked);
        if ($scope.data.checked === key.phone) {
            let mode = $scope.data.mode;
            let card = angular.element('<card-directive mode="' + mode + '" data="' + key.phone + '"></card-directive>');
            let content = angular.element(document.querySelector('.content'));
            content.append(card);
            $compile(card)($scope);
        }
    }
});