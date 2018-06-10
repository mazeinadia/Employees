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

    ctrl.$onInit = function () {
        ctrl.previousData = ctrl.data;
        log(ctrl.division);
    };

    ctrl.$onChanges = function(obj){
        log('div list changed, but not data');
        if(obj.data) {
            log('divisionList')
        }
    };
}

app.component('divisionList', {
    templateUrl: 'src/divisions/divisionsList.html',
    controller: [divisionListController],
    bindings: {
        data: '@'
    }
});