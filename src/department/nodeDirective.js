app.directive('node', function ($compile) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            member: '='
        },
        templateUrl: 'src/department/departmentNode.html',
        link: function (scope, element, attrs) {
            if (angular.isArray(scope.member.children)) {
                element.append('<department-list collection="member.children">');
                $compile(element.contents())(scope);
            }
        }
    }
});
