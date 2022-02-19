class Building {
    constructor(floors, material, address) {
        this.floors = floors;
        this.material = material;
        this.address = address;
    }

    toString() {
        return [
            `Floors: ${this.floors}`,
            `Material: ${this.material}`,
            `Address: ${this.address}`,
            `Elevator: ${this.hasElevator}`,
            `Arc reactor capacity: ${this.arcCapacity}`,
            `Height: ${this.height}`,
            `Floor height: ${this.height/this.floors}`,
        ].join('\n');
    }
}

class Tower extends Building {
    constructor(floors, material, address, hasElevator, arcCapacity, height) {
        super(floors, material, address);
        this.hasElevator = hasElevator;
        this.arcCapacity = arcCapacity;
        this.height = height;
    }

    get hasElevator() {
        return this.help1;
    }
    set hasElevator(value) {
        if (value == true) {
            this.help1 = '+';
        }
        else if (value == false) {
            this.help1 = '-';
        }
    }
}

