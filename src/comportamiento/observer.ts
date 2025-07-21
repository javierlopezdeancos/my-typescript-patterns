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

const observable = new Observable<string, (string) => void>;

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
