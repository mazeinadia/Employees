const DEPARTMENTS = [
    {
        name: 'Маркетинг'
    },
    {
        name: 'HR'
    },
    {
        name: 'Планирование',
        parent: 'Маркетинг'
    },
    {
        name: 'Техническая поддержка',
        parent: 'Корпоративный маркетинг'
    },
    {
        name: 'Корпоративный маркетинг',
        parent: 'Маркетинг'
    }
];
const POSITIONS = [
    {
        name: 'Генеральный директор',
        salary: 250000
    },
    {
        name: 'HR-менеджер',
        salary: 70000
    },
    {
        name: 'Маркетолог',
        salary: 70000
    },
    {
        name: 'Консультант',
        salary: 50000
    }
];
const EMPLOYEES = [
    {
        name: 'Пертов Перт Петрович',
        date:  '2018-03-01',
        position: 'HR-менеджер',
        department: 'HR',
        phone: '8 (998) 898 9898',
        email: 'mail@mail.ru'
    },
    {
        name: 'Иванов Иван Иванович',
        date:  '2018-03-01',
        position: 'Консультант',
        department:  'Техническая поддержка',
        phone: '8 (908) 898 9898',
        email: 'mail3@mail.ru'
    },
    {
        name: 'Кошкин Константин Константинович',
        date:  '2018-03-01',
        position: 'Генеральный директор',
        department:  '',
        phone: '8 (918) 898 9898',
        email: 'mail2@mail.ru'
    }
];
