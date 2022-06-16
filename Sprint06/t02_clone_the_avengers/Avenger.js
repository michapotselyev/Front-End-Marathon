class foo extends Function
{
    constructor()
    {
        super('...args', 'return this.self.call(...args)');
        return this.self = this.bind(this);
    }
}

module.exports.Avenger = class Avenger extends foo
{
    constructor({ name, alias, gender, age, powers, hp})
    {
        super();
        this.name_of_hero = name;
        this.alias = alias;
        this.gender = gender;
        this.age = age;
        this.powers = powers;
        this.hp = hp;
    }

    toString()
    {
        return `name: ${this.name_of_hero}\ngender: ${this.gender}\nage: ${this.age}`;
    }
    call()
    {
        return `${this.alias.toUpperCase()}\n${this.powers.join('\n')}`;
    }
}
