function divisionListController(scope) {
    let ctrl = this;

    scope.data = scope.$parent.data;
    scope.data.modes = [
        {
            value: 'employee',
            text: 'Сотрудники'
        },
        {
            value: 'department',
            text: 'Отделы'
        },
        {
            value: 'position',
            text: 'Должности'
        }
    ];

}

app.component('divisionList', {
    templateUrl: 'src/divisions/divisionsList.html',
    controller: ['$scope', divisionListController]
});