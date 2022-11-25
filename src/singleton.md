# The Singleton pattern

Singletons are classes which can be instantiated once, and can be accessed globally. This single instance can be shared throughout our application.

How a singleton should like:

* `getInstance` method that returns the value of the instance

## Source code

```typescript
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
```

## Usage

```typescript
const counter1 = new Counter();
const counter2 = new Counter();
// Error: You can only create one instance!
```
