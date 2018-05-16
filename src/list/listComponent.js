function listController(scope) {
    let ctrl = this;

    scope.data = scope.$parent.data;

    ctrl.getList = function() {
        switch (scope.data.mode) {
            case 'employee':
                return 'src/employee/employeesList.html';
            case 'department':
                return 'src/department/departmentsList.html';
            case 'position':
                return 'src/position/positionsList.html';
        }
    };

    ctrl.getSearch = function () {
        if (scope.data.mode !== undefined){
            return 'src/list/search/search.html'
        }
    };
}

app.component('list', {
    templateUrl: 'src/list/list.html',
    controller: ['$scope', listController]
});