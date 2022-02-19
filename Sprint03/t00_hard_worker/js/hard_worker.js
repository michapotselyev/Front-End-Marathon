class HardWorker  {
    constructor () {
        this.name;
        this.age;
        this.salary;
    }

    get age() {
        return this.help1;
    }
    set age(val) {
        if (val < 1 || val > 100) {
            return;
        }

        this.help1 = val;
    }
        
    get salary() {
        return this.help2;
    }
    set salary(val) {
        if (val < 100 || val > 10000) {
            return;
        }

        this.help2 = val;
    }
    toObject() {
        return `Object { name: \"${this.name}\", age: ${this.age}, salary: ${this.salary} }`;
    }
}

