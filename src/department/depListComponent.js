function departmentListController($scope) {
    let ctrl = this;

    ctrl.data = $scope.$parent.data;
}

app.component('departmentList', {
    template: '<ul>' +
    '   <node ' +
    '       ng-repeat="dep in $ctrl.collection | filter: $ctrl.data.search.name | orderBy: \'name\'" ' +
    '       member="dep">' +
    '   </node>' +
    '</ul>',
    controller: departmentListController,
    bindings: {
        collection: '<'
    }
});