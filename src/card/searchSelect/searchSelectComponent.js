function searchSelectController() {
    let ctrl = this;

    ctrl.searchChange = function(text) {
        ctrl.searchText = {name: text};
    };

    ctrl.$onInit = function () {
        //ctrl.selectText = ctrl.selected;
        ctrl.visibility = {optionsVisible: false}
    };

    ctrl.showOptions = function () {
        ctrl.visibility.optionsVisible = !ctrl.visibility.optionsVisible
    };

    ctrl.handleChoose = function(value) {
        ctrl.selected = value;
        ctrl.onSelectedChange({text: value});
        ctrl.visibility.optionsVisible = false;
        //angular.element(document.getElementById('tree')).triggerHandler('click');
    };

    ctrl.handleTreeClick = function () {
        ctrl.visibility.optionsVisible = !ctrl.visibility.optionsVisible
    }
}

app.component('searchSelect', {
    templateUrl: 'src/card/searchSelect/searchSelect.html',
    controller: searchSelectController,
    bindings: {
        options: '<',
        selected: '@',
        className: '@',
        onSelectedChange: '&'
    }
});