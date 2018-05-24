function contentController(scope) {
    let ctrl = this;

    scope.data = scope.$parent.data;
    scope.card = '';

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
            return 'src/content/search/search.html'
        }
    };

    scope.data.addCard = function() {
        log('add card called');
        ctrl.card = true;
    };

    ctrl.getCard = function() {
        log('in getCard');
        log(scope.data.mode)
        switch (scope.data.mode) {
            case 'employee':
                return 'src/employee/employeeCard.html';
            case 'department':
                return 'src/department/departmentCard.html';
            case 'position':
                return 'src/position/positionCard.html';
        }
        ctrl.card = false;
    }
}

app.component('content', {
    templateUrl: 'src/content/content.html',
    controller: ['$scope', contentController]
});