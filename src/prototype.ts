class Dog {
  private _name: string;

  constructor(name) {
    this._name = name;
  }

  bark() {
    return `Woof!`;
  }
}

class FlyerDog extends Dog {
  constructor(name) {
    super(name);
  }

  fly() {
    return "Flying!";
  }
}

const dog1 = new Dog("Daisy");
const dog2 = new Dog("Max");
const dog3 = new Dog("Spot");

dog1.bark();
// output -> "Woof!"

// Object.create
const dog = {
  bark() {
    return `Woof!`;
  }
};

const pet1 = Object.create(dog);
