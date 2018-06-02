app.directive('changeEntity', function ($compile) {
    return{
        restrict: 'A',
        scope: {
            mode: '@',
            changeEntity: '@',
            data: '@'
        },
        link: function (scope, element, attributes) {
            scope.$watch('mode', function (value) {
                scope.mode = value;
            });
            element.on('click', function () {
                let content = angular.element(document.getElementById('card'));
                let card = angular.element('<card mode="' + scope.mode + '" data="{{data}}" entity="changeEntity">');
                content.replaceWith(card);
                $compile(card)(scope)
            })
        }
    }
});