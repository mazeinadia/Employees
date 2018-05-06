app.controller('cardController', function ($compile, $scope) {
    $scope.data = {};



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

    $scope.getCardToChange = function () {
        if ($scope.data.changingNeeded !== undefined) {
            return 'src/employee/employeeCard.html'
        }
    }
});