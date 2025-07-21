- [El patrón Factoría](#el-patr%C3%B3n-factor%C3%ADa)
  - [Participantes en el patrón](#participantes-en-el-patr%C3%B3n)
  - [Ejemplo](#ejemplo)
  - [Ejemplo en vivo](#ejemplo-en-vivo)
  - [Ejemplo de código](#ejemplo-de-c%C3%B3digo)

# El patrón Factoría

Factory Method es un patrón de diseño creacional que proporciona una interfaz para crear objetos en una superclase, mientras permite a las subclases alterar el tipo de objetos que se crearán.

El patrón factoría es útil cuando el cliente no sabe de antemano qué tipo de objeto se va a instanciar, o cuando el cliente no debería saberlo. En lugar de crear objetos directamente a traves del operador `new`, el cliente utiliza una factoría que crea el objeto requerido. Esto permite al cliente mantener el control sobre el tipo de objeto que se va a instanciar, mientras delega la responsabilidad de la creación del objeto a la factoría.

Usar el patrón de factoría nos brinda ciertas ventajas:

- `Creación dinámica de objetos`: Se puede utilizar en casos donde el tipo del objeto se decide en tiempo de ejecución.
- `Abstracción`: Evitas un acoplamiento fuerte entre el creador y los productos concretos.
- `Principio de responsabilidad única`: Puedes mover el código de creación de producto a un lugar del programa, haciendo que el código sea más fácil de mantener.
- `Principio de abierto/cerrado`: Puedes incorporar nuevos tipos de productos en el programa sin descomponer el código cliente existente.

El objetivo clave del patrón de factoría es la extensibilidad. El patrón factoría se utilizan con frecuencia en aplicaciones que gestionan, mantienen o manipulan colecciones de objetos que son diferentes pero al mismo tiempo tienen muchas características (es decir, métodos y propiedades) en común.

## Participantes en el patrón

Los objetos que participan en este patrón son:

- El `Producto` declara la interfaz, que es común a todos los objetos que puede producir la clase creadora y sus subclases.

- Los `Productos Concretos` son distintas implementaciones de la interfaz de producto.

La clase `Creadora` declara el método fábrica que devuelve nuevos objetos de producto. Es importante que el tipo de retorno de este método coincida con la interfaz de producto.

Puedes declarar el patrón Factory Method como abstracto para forzar a todas las subclases a implementar sus propias versiones del método. Como alternativa, el método fábrica base puede devolver algún tipo de producto por defecto.

Observa que, a pesar de su nombre, la creación de producto no es la principal responsabilidad de la clase creadora. Normalmente, esta clase cuenta con alguna lógica de negocio central relacionada con los productos. El patrón Factory Method ayuda a desacoplar esta lógica de las clases concretas de producto.

Los Creadores Concretos sobrescriben el Factory Method base, de modo que devuelva un tipo diferente de producto.

## Ejemplo

```typescript
interface Product {
  operation(): string;
}

abstract class Creator {
  public abstract factoryMethod(): Product;

  public someOperation(): string {
    const product = this.factoryMethod();
    return `Creator: The same creator's code has just worked with ${product.operation()}`;
  }
}

class ConcreteCreatorA extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProductA();
  }
}

class ConcreteCreatorB extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProductB();
  }
}

class ConcreteProductA implements Product {
  public operation(): string {
    return '{Result of the ConcreteProductA}';
  }
}

class ConcreteProductB implements Product {
  public operation(): string {
    return '{Result of the ConcreteProductB}';
  }
}

function clientCode(creator: Creator) {
  // ...
  console.log("Client: I'm not aware of the creator's class, but it still works.");
  console.log(creator.someOperation());
  // ...
}

console.log('App: Launched with the ConcreteCreatorA.');
clientCode(new ConcreteCreatorA());
console.log('');

console.log('App: Launched with the ConcreteCreatorB.');
clientCode(new ConcreteCreatorB());
```

Output:

```text
App: Launched with the ConcreteCreatorA.
Client: I'm not aware of the creator's class, but it still works.
Creator: The same creator's code has just worked with {Result of the ConcreteProductA}

App: Launched with the ConcreteCreatorB.
Client: I'm not aware of the creator's class, but it still works.
Creator: The same creator's code has just worked with {Result of the ConcreteProductB}
```

## Ejemplo en vivo

[Ejemplo en vivo](https://www.typescriptlang.org/play/?#code/PQKhCgAIUgVALAppAwgJ0QQwC4Hs2QDGANpgM5mQAmiJmGl2SkAZpoXmgJ6QC2iTXFUhMckAJaUyAVwAOs3GUTC8kDNmloAdpExaoMXACMAVrWyRcLXZAAKaIdI5FSFAHRxm6LJwDkU6SM6CkRKaRlMYmIeWQcAN3EaESQDCV5ZYkR+LWwccVwdK2TJPgF4ITcDYHBMIzJsNHYLYMpvHHxIAG8oSF7QCF7BmAA5XGxkUQsmZDbOPkweSLJcSFjcBKTl-mpENmliC3F0zOzc7HzC62meodYm-B5+QSpKwd6QarfZQOJxQl06g0mncOA8ALJlIQACgAlAAuOwOKhObAAbnAN0g-Ux0EgAEFiMtIFoxhN4DgADQ7MiycTjCTYShaTD8KnTVAYdpofyrNBHeg8BgKLRkcRGcS-bA8SQ4mAk5qc85aADmvMcHDIHgAqhEolwqXSiAVcuIRZAtshCPhkEZwqbQpRiLhlX9kjhZWpEL9QpYdPZ1RZjGYNVT1JotMpIEYeOy2KDuKVnh4AMqBFo+wh6D2mqjiDAcaJEckqsliW2iiMUSBOl3-aOWOKINB83Mq5LIOOcR6QqgevTCMPaU2qzDUcQsFhNxA5ERcWTIIprZHOFgOXgM15vD6Y75GX7-C0AeXnjXOBVhCPqfLb3Teb2AwFQkWI7ZBXcT5RUK0IiuQo-9y6BqY5ibneRoihYS4opAAC8xSap24I9rC6JgX0j6jAA7lS4RksgUEcKBd6DjoAAGsz4AiCDIGQLKWoq+A8laSTkpQJjhBYmH4AA1pGmF0vAkAACSdAR2BuLgJ55OeMIAL6kahgyyeAyngNiuIoAUP4CDMDFoJQ6xNi2eFvg8H5CBIhRoDQBCqIQxbKnhqQMPsSqqmJPJSvOrzbi0qBaeoiAUWgACMkCIAAHuMWhUK0eldJi6lbpAoz0pMr6isqzIaBglhXMwTyfua5xRJAuGMMwtRXsCYkel5iBUogjY6II0jKoJ7JWlo2n0mJEiUE00jPoKAjhpGq64Ou1x3jAhUVJ4JSYQsr7BUQejFctOaIPOMXToG1hdT1+FIiiHrppqsqfIMu77qZ3AQs8F6IgGCVoZ6OU6BGmH+d1gUASiIUoZiymqX5mm-TpwUAEzhVF06xRyPgdLe10-K6iH3ch8LPYBr1oSRxKIN94NHf9HBQ0Dbwgxi6kwNROPQaa4xoHGyA0HQDCvpJTbSWa6XPuBR1qoBlC8BxqRHBkWR7T51RM02rMM84KO9Nzp4XE9V7Duiqm0z9Qtk4yaobMgcT0Pk4RpFLpy8wZ+XIIblnM6zsvgGDAU6YbYWSyce2UI7KurGj-xq7zmsNMOeNgQTvidAASqErl5StHvjF7sm+IpvTU27ritKniCGzDPvSzk-sncrO7B5YUlnlo4fXqqgdvDH8eJwcyfsiTf0V9gUMZ1nkA53r9MkOIe1GkkXFoNxlD8Uwug6Ka9R6IQC7WKOh2BUQelUpERiIIaTAOG18AS0bRjkMg8ss+wiAeHijoFCOFWWt6M68dtc88ZH88dcw2kuSQASJgVI7JL5KCdgrO+VIuC4GkGtHQshyCUENHoHggC-ABCCHnV2LBpDdTri4ceORNI0ChJgyiiMuQwijliR8bhGGYi6ssTIbgaxQl8Cgd+2AEQAEkAA6vh1zyl0EtXKRROp6SEZQFoVJbSHAsPUCUL5p6zzcL4GEg8WG4DYRwyhaA3BHlrhrGEWjEoMKYbrMAqR6Z4nkPuXmqw-izxsAYzyc42bbXhpHAor4uosHEMqTQTj8CpGnAkBwWhTiux0Xo50nD7GyARAAGUwAQ+yfEBIpwhuMYKIUNHmLHntMhiAoRfX1oFfJsIikFFYffDhvhNHojdnU3RDSEm+CSak9J3UkDCD-jko60NCnomKaQoQZSKnd0hnpCmZjURAA)

## Ejemplo de código

[Example](./factory.ts)
