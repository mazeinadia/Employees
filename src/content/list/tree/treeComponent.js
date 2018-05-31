function treeController() {
    let ctrl = this;
    ctrl.search = {};

    ctrl.$onChanges = function (changes) {};

    ctrl.handleChoose = function(value) {
        ctrl.onChoose({value: value})
    };
}

app.component('tree', {
    templateUrl: 'src/content/list/tree/tree.html',
    controller: treeController,
    bindings: {
        data: '<',
        search: '<',
        class: '@',
        onChoose: '&'
    }
});