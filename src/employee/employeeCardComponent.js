function employeeCardController (storage, timeout) {
    let ctrl = this;

    ctrl.$onInit = function () {
        ctrl.closing = 'false';
        if (ctrl.data){
            ctrl.toDeletePhone = ctrl.data.phone;
            ctrl.isUpdating = true;
        } else {
            ctrl.isUpdating = false;
        }
    };

    ctrl.$onChanges = function(changeObj) {
        if (changeObj.data){
            if (ctrl.data){
                ctrl.data.date = new Date(ctrl.data.date);
            }
        }
    };
    ctrl.handleSelectedChange = function(text, mode) {
        ctrl.data[mode] = text;
    };

    ctrl.$onPhoneChange = function () {
        if (ctrl.data.phone) {
            let numeric = ctrl.data.phone.replace(/[^0-9.]/g, '');
            if (numeric[0] === '8') {
                numeric = numeric.slice(1, numeric.length);
            }
            if(numeric.length > 10) {
                numeric = numeric.slice(0, 10);
            }
            if (numeric.length <= 3) {
                ctrl.data.phone = '8 (' + numeric;
            }else if (numeric.length <= 6) {
                ctrl.data.phone = '8 (' + numeric.slice(0,3) + ') ' + numeric.slice(3, numeric.length);
            }else {
                ctrl.data.phone = '8 (' + numeric.slice(0,3) + ') ' + numeric.slice(3, 6) + ' ' + numeric.slice(6, numeric.length);
            }
        }
    };

    ctrl.save = function() {
        if(ctrl.isUpdating && ctrl.data.phone!== ctrl.toDeletePhone){
            storage.deleteEntity('employee' + ctrl.toDeletePhone)
        }
        let key = 'employee' + ctrl.data.phone;
        storage.addEntity(key , ctrl.data);
        let updater = angular.element(document.getElementById('fillDB'));
        timeout(function () {
            updater.triggerHandler("click");
        });
        ctrl.closing = 'true';
    }
}

app.component('employeeCard', {
    templateUrl: 'src/employee/employeeCard.html',
    controller: ['storage', '$timeout', employeeCardController],
    bindings: {
        data: '<',
        departments: '<',
        positions: '<',
        mode: '='
    }
});