function listController() {
    let ctrl = this;

    ctrl.$onChanges = function(obj){
        if(obj.data) {
            log('list');
        }
    };
}

app.component('list', {
    templateUrl: 'src/content/list/list.html',
    controller: listController,
    bindings: {
        mode: '@',
        data: '@',
        search: '<'
    }
});