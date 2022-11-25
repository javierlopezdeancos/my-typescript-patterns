class Payload {
  public weight: number;

  constructor(weight: number) {
    this.weight = weight;
  }
}

class Engine {
  public thrust: number;

  constructor(thrust: number) {
    this.thrust = thrust;
  }
}

class Stage {
  public engines: Engine[];

  constructor(engines: Engine[]) {
    this.engines = engines;
  }
}

class Rocket {
  public stages: Stage[];

  public payload: Payload;

  constructor(stages: Stage[], payload: Payload) {
    this.stages = stages;
    this.payload = payload;
  }
}

class RocketFactory {
  private createPayload(): Payload {
    return new Payload(0);
  }

  private createStages(): Stage[] {
    let engine = new Engine(1000);
    let stage = new Stage([engine]);

    return [stage];
  }

  public buildRocket(): Rocket {
    let payload = this.createPayload();
    let stages = this.createStages();

    let rocket = new Rocket(stages, payload);

    return rocket;
  }
}

let rocketFactory = new RocketFactory();
let rocket = rocketFactory.buildRocket();

class Satellite extends Payload {
  public id: number;

  constructor(id: number) {
    super(200);
    this.id = id;
  }
}

class FirstStage extends Stage {
  constructor() {
    super([
      new Engine(1000),
      new Engine(1000),
      new Engine(1000),
      new Engine(1000)
    ]);
  }
}

class SecondStage extends Stage {
  constructor() {
    super([
      new Engine(1000)
    ]);
  }
}

type FreightRocketStages = [FirstStage, SecondStage];

class FreightRocketFactory extends RocketFactory {
  private nextSatelliteId: number;

  constructor() {
    super();
    this.nextSatelliteId = 0;
  }

  private createPayload(): Payload {
    return new Satellite(this.nextSatelliteId++);
  }

  private createStages(): FreightRocketStages {
    return [
      new FirstStage(),
      new SecondStage()
    ];
  }

  createRocket(stages: Stage[], payload: Payload): Rocket {
   return new Rocket(stages, payload);
  }


  buildRocket(): Rocket {
    let payload = this.createPayload();
    let stages = this.createStages();
    let rocket = this.createRocket(stages, payload);

    return rocket;
  }
}
