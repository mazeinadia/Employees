function departmentCardController () {
    let ctrl = this;
}

app.component('departmentCard', {
    templateUrl: 'src/department/departmentCard.html',
    controller: departmentCardController,
    bindings: {
        data: '<',
        departments: '<'
    }
});