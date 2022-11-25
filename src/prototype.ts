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
