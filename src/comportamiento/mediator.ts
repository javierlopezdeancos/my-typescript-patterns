/**
 * The Mediator interface declares a method used by components to notify the
 * mediator about various events. The Mediator may react to these events and
 * pass the execution to other components.
 */
interface Mediator {
  logMessage(user: User, message: string): void;
}

/**
 * Concrete Mediators implement cooperative behavior by coordinating several
 * components.
 */
class ChatChannel implements Mediator {
  private pilot: Pilot;

  private airTrafficController: AirTrafficController;

  constructor(pilot: Pilot, airTrafficController: AirTrafficController) {
    this.pilot = pilot;
    this.pilot.setMediator(this);

    this.airTrafficController = airTrafficController;
    this.airTrafficController.setMediator(this);
  }

  public logMessage(user: User, message: string): void {
    const time = new Date();
    const sender = user.getName();

    if (user instanceof Pilot) {
      this.airTrafficController.answerToPilot(
        `${time} [${sender}]: ${message} - [${this.airTrafficController.getName()}]: oki, I will answer you soon`
      );
    } else if (user instanceof AirTrafficController) {
      this.pilot.answerToAirTrafficController(
        `${time} [${sender}]: ${message} - [${this.pilot.getName()}]: message received, I'll take care of it`
      );
    }
  }
}

/**
 * The User class provides the basic functionality of storing a mediator's
 * instance inside user objects.
 */
class User {
  protected mediator: Mediator;

  private name: string;

  constructor(name: string, mediator?: Mediator) {
    this.name = name;
    this.mediator = mediator!;
  }

  public getName(): string {
    return this.name;
  }

  public setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }

  public send(message: string): void {
    this.mediator.logMessage(this, message);
  }
}

class Pilot extends User {
  public type = 'Pilot';

  constructor(name: string, mediator?: Mediator) {
    super(name, mediator);
  }

  public answerToAirTrafficController(message: string): void {
    this.send(message);
  }
}

class AirTrafficController extends User {
  public type = 'Air Traffic Controller';

  constructor(name: string, mediator?: Mediator) {
    super(name, mediator);
  }

  public answerToPilot(message: string): void {
    this.send(message);
  }
}

const pilot = new Pilot('John');
const airTrafficController = new AirTrafficController('Jane');
const chatChannel = new ChatChannel(pilot, airTrafficController);

pilot.send('Hello, I am ready for takeoff!');
airTrafficController.send('Roger that, you are cleared for takeoff!');
