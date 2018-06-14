function contentController() {
    let ctrl = this;

    ctrl.setSearchText = function (text) {
        ctrl.search = {name: text};
    }
}

app.component('content', {
    templateUrl: 'src/content/content.html',
    controller: contentController,
    bindings: {
        mode: '@',
        data: '@'
    }
});