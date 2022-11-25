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
