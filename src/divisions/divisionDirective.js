app.directive('division', function ($compile) {
    return {
        restrict: 'A',
        scope: {
            chosen: '@',
            division: '@',
            data: '@'
        },
        link: function (scope, element, attrs) {
            scope.$watch('chosen',
                function (value, old) {
                    if (value === 'true'){
                        updateMode();
                    }
                },
                true);
            let mode, data;
            scope.$watch('division', function (value) {
                mode = value
            });
            scope.$watch('data', function (value) {
                data = value;
            });

            function updateMode() {
                let content = angular.element(document.getElementById('content'));
                let newContent = angular.element(
                    "<content id='content' mode='" + mode + "' data='" + data + "'>"
                );
                content.replaceWith(newContent);
                $compile(newContent)(scope);
            }
        }
    }
});
