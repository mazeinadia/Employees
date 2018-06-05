app.directive('node', function ($compile) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            member: '=',
            data: '@'
        },
        templateUrl: 'src/department/departmentNode.html',
        link: function (scope, element, attrs) {
            element.find('.add').on('click', function () {
                let content = angular.element(document.getElementById('card'));
                scope.entity = {parent: scope.member.name};
                let card = angular.element('<card mode="department" data="{{data}}" entity="member">');
                content.replaceWith(card);
            });
            if (angular.isArray(scope.member.children)) {
                element.append('<department-list entities="member.children">');
                $compile(element.contents())(scope);
            }
        }
    }
});
