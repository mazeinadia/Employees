function searchController() {
    let ctrl = this;

    ctrl.handleTextChange = function() {
        ctrl.onTextChange({text: ctrl.text});
    }
}

app.component('search', {
    bindings: {
        onTextChange: '&'
    },
    templateUrl: 'src/content/search/search.html',
    controller: searchController
});