app.directive('treeNode', function ($compile) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            member: '=',
            search: '=',
            class: '@',
            onChoose: '&'
        },
        templateUrl: 'src/content/list/tree/node.html',
        link: function (scope, element, attrs) {
            if (angular.isArray(scope.member.children)) {
                element.append('<tree data="member.children" search="search" class="{{class}}">');
                $compile(element.contents())(scope);
            }
            element.on('click', function(event) {
                //choose & close
                scope.onChoose({value: event.target.id});
            })
        }
    }
});
