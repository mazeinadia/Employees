

const DEPARTMENTS = [
    {
        name: 3,
        parent: 'вышестоящий'
    },
    {
        name: 2,
        parent: 'вышестоящий'
    },
    {
        name: 1,
        parent: 'вышестоящий'
    }
];
const POSITIONS = [
    {
        name: 3,
        parent: 'вышестоящий'
    },
    {
        name: 2,
        parent: 'вышестоящий'
    },
    {
        name: 1,
        parent: 'вышестоящий'
    }
];
const EMPLOYEES = [
    {
        name: 'рабочий',
        date:  '2018-03-01',
        position: POSITIONS[1],
        department: DEPARTMENTS[1],
        phone: '123456789',
        email: 'mail@mail.ru'
    },
    {
        name: 'рабочий2',
        date:  '2018-03-01',
        position: POSITIONS[0],
        department:  DEPARTMENTS[0],
        phone: '323456789',
        email: 'mail3@mail.ru'
    },
    {
        name: 'рабочий1',
        date:  '2018-03-01',
        position: POSITIONS[2],
        department:  DEPARTMENTS[2],
        phone: '223456789',
        email: 'mail2@mail.ru'
    }
];
