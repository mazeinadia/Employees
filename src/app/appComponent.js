function appController(scope) {
    let ctrl = this;

    scope.data = {};
    scope.data.departments = [];
    scope.data.positions = [];
    scope.data.employees = [];
    scope.search = {};
    scope.root = {};
    scope.data.cardNeeded = false;
}

app.component('appComponent', {
    templateUrl: 'src/app/app.html',
    controller: ['$scope', appController]
});