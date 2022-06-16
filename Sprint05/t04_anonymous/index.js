const Anonymous = class
{
    #name;
    #alias;
    #affiliation;
    constructor(name, alias, affiliation)
    {
        this.#name = name;
        this.#alias = alias;
        this.#affiliation = affiliation;
    }
    get name()
    {
        return this.#name;
    }
    get alias()
    {
        return this.#alias;
    }
    get affiliation()
    {
        return this.#affiliation;
    }
}

function getAnonymous(name, alias, affiliation)
{
    return new Anonymous(name, alias, affiliation);
}

module.exports.getAnonymous = getAnonymous;

