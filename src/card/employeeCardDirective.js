app.directive('employeeCardDirective', function () {
    return {
        restrict: 'E',
        template: function (elem, attrs) {
            console.log('in employee directive');
            console.log(attrs.text);
            return '<div>\n' +
                '    <form>\n' +
                '        <label for="name" class="fieldLabel">ФИО сотрудника</label>\n' +
                '        <p><input id="name" type="text" class="name"\n' +
                '                  ng-model="employee.name" value="' + attrs.text + '" required></p>\n' +
                '\n' +
                '        <label for="date" class="fieldLabel">Дата приема на работу</label>\n' +
                '        <p><input id="date" type="date" class="date"\n' +
                '                  ng-model="employee.date" required></p>\n' +
                '\n' +
                '        <label for="position" class="fieldLabel">Должность</label>\n' +
                '        <p><select id="position" class="position"\n' +
                '                   ng-model="employee.position" required></select></p>\n' +
                '\n' +
                '        <label for="department" class="fieldLabel">ФОтдел</label>\n' +
                '        <p><select id="department" class="department"\n' +
                '                   ng-model="employee.department" required></select></p>\n' +
                '\n' +
                '        <label for="phone" class="fieldLabel">Номер телефона</label>\n' +
                '        <p><input id="phone" type="number" class="phone"\n' +
                '                  ng-pattern="/\\d\\d/\\d\\d/\\d\\d\\d\\d/"\n' +
                '                  ng-model="employee.phone" required></p>\n' +
                '\n' +
                '        <label for="email" class="fieldLabel">E-mail</label>\n' +
                '        <p><input id="email" type="email" class="email"\n' +
                '                  ng-model="employee.email" required></p>\n' +
                '\n' +
                '        <input type="submit" ng-click="save(employee, employeeForm)"\n' +
                '               value="Сохранить">\n' +
                '    </form>\n' +
                '</div>'
        }
    }
});