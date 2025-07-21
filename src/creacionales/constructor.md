- [El patrón Constructor](#el-patr%C3%B3n-constructor)
  - [Participantes en el patrón](#participantes-en-el-patr%C3%B3n)
  - [Ejemplo](#ejemplo)
  - [Ejemplo en vivo](#ejemplo-en-vivo)
  - [Ver un ejemplo de código](#ver-un-ejemplo-de-c%C3%B3digo)

# El patrón Constructor

Builder es un patrón de diseño creacional que nos permite construir objetos complejos paso a paso. El patrón nos permite producir distintos tipos y representaciones de un objeto empleando el mismo código de construcción.

## Participantes en el patrón

- La interfaz `Constructora` declara pasos de construcción de producto que todos los tipos de objetos constructores tienen en común.

- Los `Constructores Concretos` ofrecen distintas implementaciones de los pasos de construcción. Los constructores concretos pueden crear productos que no siguen la interfaz común.

- Los `Productos` son los objetos resultantes. Los productos construidos por distintos objetos constructores no tienen que pertenecer a la misma jerarquía de clases o interfaz.

- La clase `Directora` define el orden en el que se invocarán los pasos de construcción, por lo que puedes crear y reutilizar configuraciones específicas de los productos.

- El `Cliente` debe asociar uno de los objetos constructores con la clase directora. Normalmente, se hace una sola vez mediante los parámetros del constructor de la clase directora, que utiliza el objeto constructor para el resto de la construcción. No obstante, existe una solución alternativa para cuando el cliente pasa el objeto constructor al método de producción de la clase directora. En este caso, puedes utilizar un constructor diferente cada vez que produzcas algo con la clase directora.

Usar el patrón Constructor nos brinda ciertas ventajas:

- `Construir objetos paso a paso`: puedes aplazar pasos de la construcción o ejecutar pasos de forma recursiva.

- `Reutilizar el mismo código de construcción`: puedes reutilizar el mismo código de construcción para construir varias representaciones de productos.

- `Principio de responsabilidad única`: puedes mover o aislar un código de construcción complejo de la lógica de negocio del producto.

## Ejemplo

```typescript
interface Builder {
  producePartA(): void;
  producePartB(): void;
  producePartC(): void;
}

class ConcreteBuilderProductA implements Builder {
  private product: ProductA;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.product = new ProductA();
  }

  public producePartA(): void {
    this.product.parts.push('PartA1');
  }

  public producePartB(): void {
    this.product.parts.push('PartB1');
  }

  public producePartC(): void {
    this.product.parts.push('PartC1');
  }

  public getProduct(): ProductA {
    const result = this.product;
    this.reset();
    return result;
  }
}

class ProductA {
  public parts: string[] = [];

  public listParts(): void {
    console.log(`Product parts: ${this.parts.join(', ')}\n`);
  }
}

class Director {
  private builder: Builder;

  public setBuilder(builder: Builder): void {
    this.builder = builder;
  }

  public buildMinimalViableProduct(): void {
    this.builder.producePartA();
  }

  public buildFullFeaturedProduct(): void {
    this.builder.producePartA();
    this.builder.producePartB();
    this.builder.producePartC();
  }
}

function clientCode(director: Director) {
  const concreteBuilderProductA = new ConcreteBuilderProductA();
  director.setBuilder(concreteBuilderProductA);

  console.log('Standard basic product:');
  director.buildMinimalViableProduct();
  const concreteMinimalViableProductA = concreteBuilderProductA.getProduct();
  concreteMinimalViableProductA.listParts();

  console.log('Standard full featured product:');
  director.buildFullFeaturedProduct();
  const concreteFullFeaturedProductA = concreteBuilderProductA.getProduct();
  concreteFullFeaturedProductA.listParts();

  console.log('Custom product:');
  concreteBuilderProductA.producePartA();
  concreteBuilderProductA.producePartC();
  const concreteCustomProductA = concreteBuilderProductA.getProduct();
  concreteCustomProductA.listParts();
}

const director = new Director();
clientCode(director);
```

Output:

```text
Standard basic product:
Product parts: PartA1

Standard full featured product:
Product parts: PartA1, PartB1, PartC1

Custom product:
Product parts: PartA1, PartC1
```

## Ejemplo en vivo

[Ejemplo en vivo](https://www.typescriptlang.org/play/?#code/JYOwLgpgTgZghgYwgAgEIFdgBsAm1kDeAUMsgA5QD2O6SACnFGAIIAUAlAFzIBulwOANwlyVGvUZhUHbnwHDSFarQgMmAYRm9+QogF8iRBFjgBnU8nWUQCKBEgZseKHTG0WyYAFsyWCF4hwC0dcfGJFKGAeOEhRZQQwbld4lmERBGtTMCh3SigOQhFSMAALYFMAOjtTew4FZAMRMnQAIyxgBGRq2q5tAULSYrLKpXEwZABeZBAIAHdkZLG2dnrGxVb2ztGVNRYtORwBwdLyiu2Es8kR9FMS1gByXeYARnuVkTXyDY648VVJaS9A5HIanc5gS5Ma63B67VCvd6kT7NNo-c7-DT7HQg5AnEZuC5kK5nG53R6SdQI1aGdaozoAc3si3cWmZCWYOIyICyXQgpnQWHGUzxZwJYHqoMq3TAdSKvLA6CgIF5-MF1MaxjMFjZHnCXzp5Cu3CykRA9IA2gBdSbIK1pWmbZDtLK7UxY-p60hc0yUPwVLCUemsAAGOsNUO4ABICCKiVCKgArfggB4AGmQbz0AB0QMHEQ19IZNeZkAARYB2BJ5I4UKIxFAtTChKDcELOe36x01KRN5ysRtOaCt3vQIHYz244YVAfNm0z9sfGmdn7zgCyoG8cCwADVgHA2qoxe7DhORfPoKL4hi9vnkd9OvOAGICrCPiAxRUQHA6484s8jqBLz+J5ZUGSdTnPQD0ThUDjinSCgJ2ClYIMRoYHQGwwGAaxkGMYBAjAKw8FYHAKwgKsWzLMiKPYI5vXGLlbHsCA22gHUOSmGZ5isGw7AcAD2Ng0jKzAPIKm7Vj8kYviWIEsVmHedJMl9CB-UDB4AGUwDgEAcEYQ4WjMNExU4N56mE8jRMAtcNy8Ldd33Pwf3zejcOsJjIHXEBNx3PcD3Ym1pOYyT2IqRkwGc+ogs82z7L8pz5P9coIquWUlO5FS1KDe4tJ0vSoEOdCsCwZAYHfBU7EOcFTPzCyKOnXtn2Kt8P0qyL0p5aKICa19ys-b95MC9yZJCxLwvar1huYnqWoqr9QudFKoTSyaMr9ANsvUG5RK8X53BqqKpv4wcXES6DJGWQ7eOCuSUmYRCJExFzMgYo6IC2rJKC8AKpi60a7rCpkj2e67IA+naFuS11ZQ1F7kDqqybS4qiRLyWU8IIoiIBI6irJWIA)

## Ver un ejemplo de código

[Example](./constructor.ts)
