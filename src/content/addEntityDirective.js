app.directive('addEntity', function($compile) {
    return {
        restrict: 'E',
        template: '<input type="submit" value="+" class="button" id="addEntity">',
        link: function (scope, element, attrs) {
            scope.$watch('mode', function (value) {
                scope.mode = value;
            });
            element.on('click', function () {
                let content = angular.element(document.getElementById('card'));
                let card = angular.element('<card mode="' + scope.mode + '" data="{{data}}">');
                content.replaceWith(card);
                $compile(card)(scope)
            });
        },
        scope: {
            mode: '@',
            data: '@'
        }
    }
});