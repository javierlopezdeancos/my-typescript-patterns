# The Facade Pattern

Next, we're going to look at the facade pattern, a design pattern which plays a critical role in the architecture being defined today.

When you put up a facade, you're usually creating an outward appearance which conceals a different reality. The facade pattern provides a convenient higher-level interface to a larger body of code, hiding its true underlying complexity. Think of it as simplifying the API being presented to other developers.

Facades are a structural pattern which can often be seen in JavaScript libraries and frameworks where, although an implementation may support methods with a wide range of behaviors, only a 'facade' or limited abstract of these methods is presented to the client for use.

This allows us to interact with the facade rather than the subsystem behind the scenes.

The reason the facade is of interest is because of its ability to hide implementation-specific details about a body of functionality contained in individual modules. The implementation of a module can change without the clients really even knowing about it.

As you can see, our module contains a number of methods which have been privately defined. A facade is then used to supply a much simpler API to accessing these methods.

```ts
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

```
