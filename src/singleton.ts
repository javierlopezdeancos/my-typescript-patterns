interface Singleton {
  getInstance(): Singleton;
}

class Counter implements Singleton {
  private instance: Counter;

  private counter: number = 0;

  constructor() {
    if (this.instance) {
      throw new Error("You can only create one instance!");
    }

    this.instance = this;
  }

  getInstance(): Singleton {
    return this;
  }

  getCount() {
    return this.counter;
  }

  increment() {
    return ++this.counter;
  }

  decrement() {
    return --this.counter;
  }
}
