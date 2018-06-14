function optionsController() {
    let ctrl = this
}

app.component('options', {
    templateUrl: 'src/card/searchSelect/options/options.html',
    controller: optionsController,
    bindings: {
        data: '<',
        search: '@'
    }
});