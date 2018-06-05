function positionCardController () {
    let ctrl = this;

    ctrl.$onSalaryChanged = function () {
        if (ctrl.data.salary) {
            //log(ctrl.salary.length);
            if (ctrl.data.salary.length > 3) {
                let formatted = ctrl.data.salary.replace(/[^\d]/, '').replace(/ /g, '');
                let length = formatted.length;
                log(formatted);
                while (length > 3) {
                    length = length - 3;
                    //log(length);
                    formatted = formatted.slice(0, length) + ' ' + formatted.slice(length);
                }
                ctrl.data.salary = formatted;
            } else {
                ctrl.data.salary = ctrl.data.salary.replace(/[^\d]/, '').replace(/ /g, '');
            }
        }
    };

    ctrl.$onInit = function () {
        if (ctrl.data){
            ctrl.toDelete = 'position' + ctrl.data.name;
            ctrl.isUpdating = true;
        } else {
            ctrl.isUpdating = false;
        }
    };

    ctrl.save = function() {
        if(ctrl.isUpdating){
            storage.deleteEntity(ctrl.toDelete)
        }
        storage.addEntity('position' + ctrl.data.name, ctrl.data);
    }
}

app.component('positionCard', {
    templateUrl: 'src/position/positionCard.html',
    controller: positionCardController,
    bindings: {
        data: '<'
    }
});