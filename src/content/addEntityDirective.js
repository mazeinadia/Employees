app.directive('addEntity', function($compile) {
    return {
        restrict: 'E',
        template: '<input type="submit" value="+" class="button" id="addEntity">',
        link: function (scope, element, attrs) {
            /*log('in add entity' + scope.mode);
            scope.$watch('mode', function (value) {
                log('in add entity mode changed to ' + value);
            })
            element.on('click', function () {
                log('add card button clicked');
                let content = angular.element(document.getElementById('content-container'));
                log('in add entity ' + content.html());
                content.append('<card mode="' + scope.mode + '">');
                $compile()
            });
            $compile(content.contents())(scope)*/
        },
        scope: {
            mode: '@'
        }
    }
});