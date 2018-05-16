function departmentController(scope) {
    let ctrl = this;


    ctrl.change = function () {

    }
}

app.component('department', {
   templateUrl: 'src/department/departmentNode.html',
   controller: ['$scope', departmentController],
    bindings: {
       dep: '<'
    }
});