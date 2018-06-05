/*const DEPARTMENTS = [
    {
        name: 'Отдел1',
        children:[
            {
                name: 'Отдел1.1',
                children: [
                    {
                        name: 'Отдел1.1.1'
                    }
                ]
            },
            {
                name: 'Отдел1.2'
            }
        ]
    },
    {
        name: 'Отдел2'
    }
];*/

const DEPARTMENTS = [
    {
        name: 'Отдел1'
    },
    {
        name: 'Отдел2'
    },
    {
        name: 'Отдел1.1',
        parent: 'Отдел1'
    },
    {
        name: 'Отдел1.1.1',
        parent: 'Отдел1.1'
    },
    {
        name: 'Отдел1.2',
        parent: 'Отдел1'
    }
];
const POSITIONS = [
    {
        name: 'Должность1',
        salary: 10500
    },
    {
        name: 'Должность2',
        salary: 200
    },
    {
        name: 'Должность3',
        salary: 150000
    },
    {
        name: 'Должность4',
        salary: 3500000
    }
];
const EMPLOYEES = [
    {
        name: 'рабочий',
        date:  new Date('2018-03-01'),
        position: 'Должность2',
        department: 'Отдел2',
        phone: '+7(123)456-7890',
        email: 'mail@mail.ru'
    },
    {
        name: 'рабочий2',
        date:  '2018-03-01',
        position: 'Должность1',
        department:  'Отдел1',
        phone: '+7(321)456-7890',
        email: 'mail3@mail.ru'
    },
    {
        name: 'рабочий1',
        date:  '2018-03-01',
        position: 'Должность4',
        department:  'Отдел1.1',
        phone: '+7(213)456-7890',
        email: 'mail2@mail.ru'
    }
];
