function contentController() {
    let ctrl = this;

    ctrl.setSearchText = function (text) {
        ctrl.search = {name: text};
        log('CONTENT search for ' + text);
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