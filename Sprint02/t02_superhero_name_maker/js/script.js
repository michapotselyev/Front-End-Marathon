let regex;
let animal;
let gender;
let age;
let description;

while (animal == null) {
    animal = prompt('What animal is the superhero most similar to?', '');
    regex = RegExp('^[a-zA-Z]+$');
    if (animal.length > 20 || !regex.test(animal)) {
        alert('ERROR: Accepts only one word, which consists only of Latin letters and its length does not exceed 20 characters.');
        animal = null;
    }
    else {
        break;
    }
}

while (gender == null) {
    gender = prompt('Is the superhero male or female? Leave blank if unknown or other.', '');
    regex = RegExp('^male$|^female$|^$', 'i');
    if (!regex.test(gender)) {
        alert('ERROR: Accepts only male, female gender or blank (not case sensitive)!');
        gender = null;
    }
    else {
        break;
    }
}

while (age == null) {
    age = prompt('How old is the superhero?', '');
    regex = RegExp('^[0-9]+$');
    if (age.length > 5 || !regex.test(age) || (age[0] == 0 && age[1])) {
        alert('ERROR: Accepts only digits, cannot start with a zero, no more than 5 characters!');
        age = null;
    }
    else {
        break;
    }
}

if (RegExp('^male$', 'i').test(gender)) {
    if (age < 18) {
        description = "boy";
    }
    else if (age >= 18) {
        description = "man";
    }
}
else if (RegExp('^female$', 'i').test(gender)){
    if (age < 18) {
        description = "girl";
    }
    else if (age >= 18) {
        description = "woman";
    }
}
else if (RegExp('^$', 'i').test(gender)){
    if (age < 18) {
        description = "kid";
    }
    else if (age >= 18) {
        description = "hero";
    }
}

alert(animal + '-' + description);

