function optionsController() {
    let ctrl = this;

    ctrl.$onChanges = function (changes) {

    }
}

app.component('options', {
    templateUrl: 'src/card/options.html',
    controller: optionsController,
    bindings: {
        data: '<',
        search: '@'
    }
});