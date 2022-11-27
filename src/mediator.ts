interface Mediator {
  logMessage(pilot: Pilot, message: string): void;
}

class ChatChannel implements Mediator {
  constructor() {}

  public logMessage(pilot: Pilot, message: string): void {
    const time = new Date();
    const sender = pilot.getName();

    console.log(`${time} [${sender}]: ${message}`);
  }
}

interface User {
  getName(): string;
  send(message: string): void;
}

class Pilot implements User {
  private name: string;

  private chatChannel: ChatChannel;

  constructor(name: string, chatChannel: ChatChannel) {
    this.name = name;
    this.chatChannel = chatChannel;
  }

  public getName(): string {
    return this.name;
  }

  public send(message: string): void {
    this.chatChannel.logMessage(this, message);
  }
}
