class PublishSubscriber<D = any, C =  (d: D) => void>  {
  private _subscribers: Record<string, C[]> = {};

  constructor() {}

  public get subscribers() : any {
    return this._subscribers;
  }

  public subscribe(event: string, callback: C): void {
    if (!this._subscribers[event]) {
        this._subscribers[event] = [];
    }

    this._subscribers[event].push(callback);
  }

  public publish(event: string, data: D): void {
    if (!this._subscribers[event]) {
      return;
    }

    this._subscribers[event].forEach(callback => {
      if (typeof callback !== 'function') {
        return;
      }

      callback(data);
    });
  }
}
