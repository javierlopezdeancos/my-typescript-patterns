interface Singleton {
  getInstance(): Singleton;
}

class Counter implements Singleton {
  private instance: Counter;

  private counter: number = 0;

  constructor() {
    this.instance = this;

    if (this.instance) {
      throw new Error('You can only create one instance!');
    }
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

const counterA = new Counter();
console.log('counterA', counterA.getCount());

try {
  const counterB = new Counter();
  console.log('counterB', counterB.getCount());
} catch (error) {
  console.log(error);
}
