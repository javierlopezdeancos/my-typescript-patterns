- [El Patrón Mediador](#el-patr%C3%B3n-mediador)
  - [Usando el mediador](#usando-el-mediador)
  - [Ejemplo](#ejemplo)
  - [Ejemplo en vivo](#ejemplo-en-vivo)
  - [Ejemplo de código](#ejemplo-de-c%C3%B3digo)

# El Patrón Mediador

Mediator es un patrón de diseño de comportamiento que te permite reducir las dependencias caóticas entre objetos. El patrón restringe las comunicaciones directas entre los objetos, forzándolos a colaborar únicamente a través de un objeto mediador.

El patrón Mediador proporciona una autoridad central sobre un grupo de objetos al encapsular cómo interactúan estos objetos. Este modelo es útil para escenarios en los que hay una necesidad de gestionar condiciones complejas en las que cada objeto es consciente de cualquier cambio de estado en cualquier otro objeto del grupo.

El patrón mediador se presenta mejor con una analogía simple: piensa en el control de tráfico aéreo típico. La torre maneja qué aviones pueden despegar y aterrizar porque todas las comunicaciones se realizan desde los aviones a la torre de control, en lugar de entre los aviones.

Un controlador centralizado es clave para el éxito de este sistema y eso es realmente lo que es un mediador.

En términos del mundo real, un mediador encapsula cómo los módulos dispares interactúan entre sí actuando como intermediario. El patrón también promueve un acoplamiento débil al evitar que los objetos se refieran entre sí de manera explícita; en nuestro sistema, esto ayuda a resolver nuestros problemas de interdependencia de módulos.

¿Qué otras ventajas tiene para ofrecer? Bueno, los mediadores permiten que las acciones de cada módulo varíen de forma independiente, por lo que es extremadamente flexible. Si has utilizado anteriormente el patrón Observer (Pub/Sub) para implementar un sistema de difusión de eventos entre los módulos de tu sistema, encontrarás que los mediadores son relativamente fáciles de entender.

Utilizar el patrón Mediador aporta varias ventajas:

- `Principio de responsabilidad única`. Puedes extraer las comunicaciones entre varios componentes dentro de un único sitio, haciéndolo más fácil de comprender y mantener.

- `Principio de abierto/cerrado`. Puedes introducir nuevos mediadores sin tener que cambiar los propios componentes.

- Puedes reducir el acoplamiento entre varios componentes de un programa.

- Puedes reutilizar componentes individuales con mayor facilidad.

## Usando el mediador

Los patrones Mediador son útiles en el desarrollo de formularios complejos. Tomemos como ejemplo una página en la que ingresas opciones para hacer una reserva de vuelo. Una regla simple del Mediador sería: debes ingresar una fecha de salida válida, una fecha de regreso válida, la fecha de regreso debe ser posterior a la fecha de salida, un aeropuerto de salida válido, un aeropuerto de llegada válido, un número válido de viajeros, y solo entonces se puede activar el botón de búsqueda.

Otro ejemplo de Mediador es el de una torre de control en un aeropuerto que coordina las llegadas y salidas de los aviones.

## Ejemplo

```typescript
interface Mediator {
  logMessage(user: User, message: string): void;
}

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
```

Output:

```text
// Output:

// "Tue Jul 22 2025 01:09:16 GMT+0200 (hora de verano de Europa central) [John]: Hello, I am ready for takeoff! - [Jane]: oki, I will answer you soon"

// "Tue Jul 22 2025 01:09:16 GMT+0200 (hora de verano de Europa central) [Jane]: Roger that, you are cleared for takeoff! - [John]: message received, I'll take care of it"
```

## Ejemplo en vivo

[Ejemplo en vivo](https://www.typescriptlang.org/play/?#code/PQKhCgAIUgVALAppAsogJgSwIYBcD2ATpJgHa6KEBm2AxsuorQDbaGIDOk2kAtornj50kAK4cMkAEYBPSLXy8ADvlKJyXApFL5cmKnMGIoMfljxFuU-KNyQAbm0w2uie+twcAdHCSoMOATEvNhy7HR2WkYSkG4eXNik6CaQStgcmn6IAB5Mts6kkFq6SMQKyqrxXibA4GQU1HTIaOZBkADeUJDM+ADmaBnYvYgAFOKUAFyQAKoShAA0fJwcQ4hTHLiEZL0AlFP2+JjoANzgAL7g4KAQ0JAAwqq07BT+rURcmMrMiPzk8vj4JSUPCYdzSRDwbD2ZzEWT-IhYUgg0i9SASdyEbDMFLlFRqDTVaC1FjpLh3SG4cmJNTMEhfH7xV6BSydSCpLaOF5KTA9XBTAAKPN0py6Sg5eGQ2EwhFgmKoVEwtAe5EI+GY30IUwAgtLZdh5YrlZs1RqRWyFKQNoRRLQgiNubyBULcIspTK5QqlapjerJpAde79Z6jarfYQdh0umzBJhvA7dJAALypZ2nNnR+Cxrzx3BeCS4FrMwgjGMcHZm9OlrxuvUGr0qk2UJPcXUew3e0OmqNFTPeGtt+s+jV5gSFizF0vlroXUWiKTMRXdPoDFbDMZzKazSiLfiDYbrTbbPYOQ4iVnpi0bIqfZDJtQAd0gABEJSMp+n-pa7BIkk3k+NCC8YZcAAOWwfg3wrNl9EgdcmzIDZEnofAqEgQVeQjc8Pyrfsg3bBswy8TYmmVDEVj0VQRh-RgFiWPdEEWPR+HfdMzliZgYhguDiAQ3AkMQFD-VbPDB07ShMO7DMsxzIjMXoUjKHIgoqPUGid2WVZGJvFi2QuXTzkua4UgQZAtzKVgMnZfBoUYTJkCkdJFyoURSFtAosUwXA5EEjYiG2bgljeQgAHIOBSXj+JIS0jmQADIHwKQACsmE8QkQGJCyuDMyM2TFXQUskMwiymMcggrMVQQlbRwLWNFDxRCtL02G07SRfgDy2FF1KCgB+EqAnHCTsN7Lw2tvar+DTSsRqK8dm1moIAEIppnXK5wXWhIGAsCIOPK1-KwyBnlEQhCirMaVsuNb50XfNSqIEYFqIfqguPA4jhy6asye4hkx+y7ZxuzbqMejT9zqzrdn2U9Pqk7wfq8Hp+jB0ZS3U+iWIuGcSUs9CExyCgkiyuZPqUdbFy8oFm2CvHcGCxrVCtFqHrGjrtm6os+qZQbYbRUQgWLMaOcGgHro2oo5MQBTCCUyjqL9fauro1dasV3otPa58qremHDsvNVEERvoRgAAwAEnaJjEDYgBtC35cIM4AF0pgt3cVbYgBaSA7ctkbtpqt9namd3ViOphEFBDBFgASWC9UimwABrZBaDYZBBM8k3MYM8Aca4ANa2DDtG2IAnVOJptzzJoGihkKnk2CgM4AHe4S7Demrs-JnbRZmq2aVn6ufu8NeY4fnKBGIXAqLHPAfF4j5NUMiQTl1SFfq9XldWAet6tqYXxeHWPr1xmDaN3pTYtq3bft9fHZdyA3ZRr2fev-2BB20YdmD+Kk8wWOkB7w8lpIkDg94mwyBsGiAEpBs6XWxozOwOZmwPjQs6EYwUABS+B4CkGClOJqLZAx1hDKXVBiBHyFwHGQsMmCsGJEQAQkURDaAUipKQGkFDHxUkpJCThiBmD2mdK6YSpD24ainOAGSINgoAAlBE9EAeBcO2B0ByCoJYPiKcUJUEWsw8AuFxEEWHLIgASn0Jsgg8CLCgaIbg7B5DfHTiITRxBtECXlPoqcQA)

## Ejemplo de código

[Example](./mediator.ts)
