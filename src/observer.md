# The Observer pattern

With the observer pattern, we can subscribe certain objects, the observers, to another object, called the observable. Whenever an event occurs, the observable notifies all its observers!

An observable object usually contains 3 important parts:

* `observers`: an array of observers that will get notified whenever a specific event occurs.
* `subscribe()`: a method in order to add observers to the observers list.
* `unsubscribe()`: a method in order to remove observers from the observers list.
* `notify()`: a method to notify all observers whenever a specific event occurs.

## Source code

```ts
class Observable<D = any, C =  (d: D) => void> {
  private observers: C[] = [];

  constructor() {}

  subscribe(callback: C): void {
    this.observers.push(callback);
  }

  unsubscribe(callback:C): void {
    this.observers = this.observers.filter(observer => observer !== callback);
  }

  notify(data: D): void {
    this.observers.forEach(observer => {
      if (typeof observer !== 'function') {
        return;
      }

      observer(data);
    });
  }
}
```

## Usage

```ts
const observable = new Observable<string, (string) => void();

const listenerOne = (data: string) => {
  console.log('One has been notified about: ' + data);
};

const listenerTwo = (data: string) => {
  console.log('Two has been notified about: ' + data);
};

observable.subscribe(listenerOne);
observable.subscribe(listenerTwo);

observable.notify('Hello World!');

// output =>
// 'One has been notified about: Hello World!'
// 'Two has been notified about: Hello World!'
```
