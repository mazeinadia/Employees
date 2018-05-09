app.filter('phoneFormat', function () {
    return function (text) {
        //+7(___)___-____

        let number = text.slice(0,15);

        let rus = number.slice(0,3);
        if (rus !== '+7('){
            number = '+7(' + number.slice(3)
        }

        let endCode = number[6];
        if (endCode !== ')'){
            number = number.slice(0,6) + ')'
                + number.slice(6);
        }

        let hyphen = number[10];
        if (hyphen !== '-'){
            number = number.slice(0,10) + '-'
                + number.slice(10);
        }

        return onlyNumbersContains(number);
    }
});

function onlyNumbersContains(text) {
    let digits = text.slice(3,6)  + text.slice(7,10) + text.slice(11);
    digits.toString().replace(/[^0-9]/g, '').slice(0, 10);
    return ('+7(' + digits.slice(0, 3) + ')' + digits.slice(3, 6)
        + '-' + digits.slice(6));
}