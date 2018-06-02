function searchSelectController() {
    let ctrl = this;

    ctrl.searchChange = function(text) {
        ctrl.searchText = {name: text};

    };

    ctrl.$onInit = function () {
        ctrl.selectText = ctrl.selected;
        ctrl.visibility = {};
        ctrl.visibility.optionsVisible = false
    };

    ctrl.$onChanges = function () {};

    ctrl.showOptions = function () {
        ctrl.visibility.optionsVisible = !ctrl.visibility.optionsVisible
    };

    ctrl.handleChoose = function(value) {
        ctrl.selectText = value;
        ctrl.selected = value;
        ctrl.onSelectedChange({text: value})
    };

    ctrl.handleTreeClick = function () {
        ctrl.visibility.optionsVisible = !ctrl.visibility.optionsVisible
    }
}

app.component('searchSelect', {
    templateUrl: 'src/card/searchSelect.html',
    controller: searchSelectController,
    bindings: {
        options: '<',
        selected: '@',
        className: '@',
        onSelectedChange: '&'
    }
});