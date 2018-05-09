app.filter('formatText', function () {
    return function (text, searchedFor) {
        return text.contains(searchedFor);

    }
});