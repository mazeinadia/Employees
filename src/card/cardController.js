app.controller('cardController', ['$scope', '$compile', function (scope, compile) {
    function deleteOldCard() {
        let content = angular.element(document.querySelector('.content'));
        let oldCard = content.find('card-directive');
        oldCard.remove();
        oldCard = content.find('employee-card-directive');
        oldCard.remove();
    }
    //DOM manipulating?
    scope.additionNeeded = function () {
        deleteOldCard();
        scope.data.addition = true;
        let mode = scope.data.mode;
        let card = angular.element('<card-directive mode="' + mode + '"></card-directive>');
        let content = angular.element(document.querySelector('.content'));
        content.append(card);
        compile(card)(scope);
    };

    scope.changingNeeded = function () {
        deleteOldCard();
        log(scope.data.checked);
        let card = angular.element('<employee-card-directive>');
        let content = angular.element(document.querySelector('.content'));
        content.append(card);
        $compile(card)(scope);
    };

    scope.addDepartmentChild = function(parent) {

    }
}]);