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
        name: 'Отдел1.2',
        parent: 'Отдел1'
    },
    {
        name: 'Отдел1.1.1',
        parent: 'Отдел1.1'
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
        date:  '2018-03-01',
        position: POSITIONS[1],
        department: DEPARTMENTS[1],
        phone: '+7(123)456-7890',
        email: 'mail@mail.ru'
    },
    {
        name: 'рабочий2',
        date:  '2018-03-01',
        position: POSITIONS[0],
        department:  DEPARTMENTS[0],
        phone: '+7(321)456-7890',
        email: 'mail3@mail.ru'
    },
    {
        name: 'рабочий1',
        date:  '2018-03-01',
        position: POSITIONS[2],
        department:  DEPARTMENTS[2],
        phone: '+7(213)456-7890',
        email: 'mail2@mail.ru'
    }
];
