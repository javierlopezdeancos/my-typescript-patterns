type Facade = {
  value: number;
  run?: boolean;
  jump?: boolean;
}

class Module {
  private value: number;

  constructor() {}

  private run(): void {
    console.log('running');
  }

  private jump(): void {
    console.log('jumping');
  }

  public facade(props: Facade): void {
    this.value = props.value;

    console.log(`current value: ${this.value}`);

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
