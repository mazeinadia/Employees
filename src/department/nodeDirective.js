app.directive('node', function ($compile) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            member: '=',
            data: '@',
            search: '='
        },
        templateUrl: 'src/department/departmentNode.html',
        link: function (scope, element, attrs) {
            element.find('button').on('click', function () {
                let content = angular.element(document.getElementById('card'));
                scope.entity = {parent: scope.member.name};
                let card = angular.element('<card mode="department" data="{{data}}" entity="entity">');
                content.replaceWith(card);
                $compile(card)(scope);
            });
            element.find('input').on('change', function () {
                let content = angular.element(document.getElementById('card'));
                let card = angular.element('<card mode="department" data="{{data}}" entity="member">');
                content.replaceWith(card);
                $compile(card)(scope);
            });
            if (angular.isArray(scope.member.children)) {
                element.append('<department-list entities="member.children" data="{{data}}" search="search">');
                $compile(element.contents())(scope);
            }
        }
    }
});
