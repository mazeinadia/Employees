app.filter('parentFilter', function () {
    return function (department, parentShould) {
        log('dep: ' + department);
        log('parent: ' + parentShould);
        if (department.parent === parentShould){
            return department
        }
    }
});