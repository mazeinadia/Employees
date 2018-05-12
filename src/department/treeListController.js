app.controller('treeListController', ['$scope', '$compile', function (scope, compile) {
    scope.getChildren = function (parent) {
        let children = [];
        scope.departments.forEach((department) => {
            if(department.parent === parent){
                children.push(department);
                scope.departments.remove(department);
                //addnode

                //find parent elem
                let parentHTML = angular.element(document.getElementById('node-'+parent+'-children'));
                //create node
                let nodeHTML = angular.element('<depaptment-node>');
                //append
                parentHTML.append(nodeHTML);

                //the same for child
                scope.getChildren(department.name);
            }
        })
    };

    scope.buildTree = function () {
        scope.departments = scope.data.departments;
        scope.getChildren(undefined);
    }
}]);