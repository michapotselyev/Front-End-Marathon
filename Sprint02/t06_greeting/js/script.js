let input = prompt('Enter your first name');
let first_name = String(input);
input = prompt('Enter your last name');
let last_name = String(input);
errorInput(first_name);
errorInput(last_name);
first_name = first_name.charAt(0).toUpperCase() + first_name.slice(1).toLowerCase();
last_name = last_name.charAt(0).toUpperCase() + last_name.slice(1).toLowerCase();
console.log('Hello, ' + first_name + ' ' + last_name + '!');
alert('Hello, ' + first_name + ' ' + last_name + '!');

function errorInput(name) {
    for (let i = 0; name[i]; i++) {
        if (!isNaN(name[i])) {
            alert('Wrong input!');
            console.log('Wrong input!');
            throw '';
        }
    }
}

