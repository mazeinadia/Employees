app.directive('cardDirective', function ($compile) {
    function getListTemplate(mode) {
        switch (mode) {
            case 'employee':
                return '<employee-card-directive>';
            case 'department':
                return '';
            case 'position':
                return '';
        }
    }

    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            entity: '='
        },
        template: '<div class="content">' +
        '   <input type="submit" id="add">' +
        '</div>',
        link: function(scope, element, attrs) {
            log('in content directive link');
            //compile on click?
            let button = element.find('input');
            log(element.html());
            log(button.id);
            button.on('click', function () {
                log('btn click');
                element.append(searchTemplate);
                element.append(getListTemplate(scope.data.mode));
                $compile(element.contents())(scope);
            });
            $compile(element.contents())(scope);
            log(element.html());
        }
    }
});