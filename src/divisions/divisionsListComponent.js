function divisionListController() {
    let ctrl = this;

    ctrl.modes = [
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
    ctrl.isChosen = function(value) {
        return (value === ctrl.division)
    };
    /*ctrl.$onChanges = function() {
        log(ctrl.data);
    }*/
}

app.component('divisionList', {
    templateUrl: 'src/divisions/divisionsList.html',
    controller: [divisionListController],
    bindings: {
        data: '@'
    }
});