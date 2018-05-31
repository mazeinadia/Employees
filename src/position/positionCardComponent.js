function positionCardController () {
    let ctrl = this;

    ctrl.$onSalaryChanged = function () {
        if (ctrl.salary) {
            //log(ctrl.salary.length);
            if (ctrl.salary.length > 3) {
                let formatted = ctrl.salary.replace(/[^\d]/, '').replace(/ /g, '');
                let length = formatted.length;
                log(formatted);
                while (length > 3) {
                    length = length - 3;
                    //log(length);
                    formatted = formatted.slice(0, length) + ' ' + formatted.slice(length);
                }
                ctrl.salary = formatted;
            } else {
                ctrl.salary = ctrl.salary.replace(/[^\d]/, '').replace(/ /g, '');
            }
        }
    }
}

app.component('positionCard', {
    templateUrl: 'src/position/positionCard.html',
    controller: positionCardController,
    bindings: {
        data: '<'
    }
});