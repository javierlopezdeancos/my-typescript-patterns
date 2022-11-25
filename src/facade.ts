type FacadeProps = {
  value: number;
  run?: boolean;
  jump?: boolean;
}

class Module {
  private _value: number;

  constructor() {}

  private run(): void {
    console.log('running');
  }

  private jump(): void {
    console.log('jumping');
  }

  public get value() : number {
    return this._value;
  }

  public set value(v : number) {
    this._value = v;
  }

  public facade(props: FacadeProps): void {
    this._value = props.value;

    console.log(`current value: ${this._value}`);

    if (props.run) {
        this.run();
    }

    if (props.jump) {
        this.jump();
    }
  }
}

const module = new Module();
module.facade({ run: true, value: 10 });

//outputs current value: 10, running
