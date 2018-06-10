app.directive('division', function ($compile) {
    return {
        restrict: 'A',
        scope: {
            chosen: '@',
            division: '@',
            data: '@'
        },
        link: function (scope, element, attrs) {
            scope.$watch('chosen', function (value, old) {
                if (value === 'true'){
                    update();
                }
            });

            scope.$watch('data', function (value) {
                if(scope.chosen === 'true') {
                    update();
                }
            });

            function update() {
                log('division -> updt');
                let content = angular.element(document.getElementById('content'));
                let newContent = angular.element(
                    '<content id="content" mode="{{division}}" data="{{data}}">'
                );
                content.replaceWith(newContent);
                $compile(newContent)(scope);
            }
        }
    }
});