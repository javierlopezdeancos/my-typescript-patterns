- [El patron Iterator](#el-patron-iterator)
  - [Usando el patrón Iterator](#usando-el-patr%C3%B3n-iterator)
  - [Ejemplo](#ejemplo)
  - [Ejemplo en vivo](#ejemplo-en-vivo)
  - [Ejemplo de código](#ejemplo-de-c%C3%B3digo)

# El patron Iterator

Iterator es un patrón de diseño de comportamiento que te permite recorrer elementos de una colección sin exponer su representación subyacente (lista, pila, árbol, etc.).

El patrón Iterator permite a los clientes recorrer eficazmente una colección de objetos.

## Usando el patrón Iterator

Una tarea común de programación es recorrer y manipular una colección de objetos. Estas colecciones pueden almacenarse como un array o quizás algo más complejo, como una estructura de árbol o gráfico. Además, es posible que necesites acceder a los elementos de la colección en un cierto orden, como de adelante hacia atrás, de atrás hacia adelante, en profundidad (como en búsquedas en árboles), omitiendo objetos de número par, etc.

El patrón de diseño Iterator resuelve este problema al separar la colección de objetos de la iteración de estos objetos mediante la implementación de un iterador especializado.

Hoy en día, muchos lenguajes tienen iteradores integrados al soportar construcciones del tipo `for-each` y las interfaces IEnumerable e IEnumerator. Sin embargo, JavaScript solo soporta bucles básicos en forma de for, `for-in`, `while` y `do while`.

La idea central del patrón Iterator es extraer el comportamiento de recorrido de una colección y colocarlo en un objeto independiente llamado iterador.

Además de implementar el propio algoritmo, un objeto iterador encapsula todos los detalles del recorrido, como la posición actual y cuántos elementos quedan hasta el final. Debido a esto, varios iteradores pueden recorrer la misma colección al mismo tiempo, independientemente los unos de los otros.

Normalmente, los iteradores aportan un método principal para extraer elementos de la colección. El cliente puede continuar ejecutando este método hasta que no devuelva nada, lo que significa que el iterador ha recorrido todos los elementos.

Todos los iteradores deben implementar la misma interfaz. Esto hace que el código cliente sea compatible con cualquier tipo de colección o cualquier algoritmo de recorrido, siempre y cuando exista un iterador adecuado.

Usar el patrón Iterator aporta varias ventajas:

- `Principio de responsabilidad única`. Puedes limpiar el código cliente y las colecciones extrayendo algoritmos de recorrido voluminosos y colocándoles en clases independientes.
- `Principio de abierto/cerrado`. Puedes implementar nuevos tipos de colecciones e iteradores y pasarlos al código existente sin descomponer nada.
- `Puedes recorrer la misma colección en paralelo` porque cada objeto iterador contiene su propio estado de iteración.
- `Por la misma razón, puedes retrasar una iteración` y continuar cuando sea necesario.

## Ejemplo

```typescript
/**
 * Iterator Design Pattern
 *
 * Intent: Lets you traverse elements of a collection without exposing its
 * underlying representation (list, stack, tree, etc.).
 */

interface MyIterator<T> {
  // Return the current element.
  current(): T;

  // Return the current element and move forward to next element.
  next(): T;

  // Return the key of the current element.
  key(): number;

  // Checks if current position is valid.
  valid(): boolean;

  // Rewind the Iterator to the first element.
  rewind(): void;
}

interface Aggregator {
  // Retrieve an external iterator.
  getIterator(): MyIterator<string>;
}

/**
 * Concrete Iterators implement various traversal algorithms. These classes
 * store the current traversal position at all times.
 */
class AlphabeticalOrderIterator implements MyIterator<string> {
  private collection: WordsCollection;

  /**
   * Stores the current traversal position. An iterator may have a lot of
   * other fields for storing iteration state, especially when it is supposed
   * to work with a particular kind of collection.
   */
  private position: number = 0;

  /**
   * This variable indicates the traversal direction.
   */
  private reverse: boolean = false;

  constructor(collection: WordsCollection, reverse: boolean = false) {
    this.collection = collection;
    this.reverse = reverse;

    if (reverse) {
      this.position = collection.getCount() - 1;
    }
  }

  public rewind() {
    this.position = this.reverse ? this.collection.getCount() - 1 : 0;
  }

  public current(): string {
    return this.collection.getItems()[this.position];
  }

  public key(): number {
    return this.position;
  }

  public next(): string {
    const item = this.collection.getItems()[this.position];
    this.position += this.reverse ? -1 : 1;
    return item;
  }

  public valid(): boolean {
    if (this.reverse) {
      return this.position >= 0;
    }

    return this.position < this.collection.getCount();
  }
}

/**
 * Concrete Collections provide one or several methods for retrieving fresh
 * iterator instances, compatible with the collection class.
 */
class WordsCollection implements Aggregator {
  private items: string[] = [];

  public getItems(): string[] {
    return this.items;
  }

  public getCount(): number {
    return this.items.length;
  }

  public addItem(item: string): void {
    this.items.push(item);
  }

  public getIterator(): MyIterator<string> {
    return new AlphabeticalOrderIterator(this);
  }

  public getReverseIterator(): MyIterator<string> {
    return new AlphabeticalOrderIterator(this, true);
  }
}

/**
 * The client code may or may not know about the Concrete Iterator or Collection
 * classes, depending on the level of indirection you want to keep in your
 * program.
 */
const collection = new WordsCollection();

collection.addItem('First');
collection.addItem('Second');
collection.addItem('Third');

const iterator = collection.getIterator();

console.log('Straight traversal:');

while (iterator.valid()) {
  console.log(iterator.next());
}

console.log('');
console.log('Reverse traversal:');

const reverseIterator = collection.getReverseIterator();

while (reverseIterator.valid()) {
  console.log(reverseIterator.next());
}
```

Output:

```text
"Straight traversal:"
"First"
"Second"
"Third"
""
"Reverse traversal:"
"Third"
"Second"
"First"
```

## Ejemplo en vivo

[Ejemplo en vivo](https://www.typescriptlang.org/play/?#code/PQKhCgAIUhJAXApgJwIbwPbMgEUQZwEsBzAO0gAV0llSoJo5SlmAuSAGUXn0gE8MAV0jw0ANxT5EkRABtEAW0TNeGAGaRUkAMYZZ87fEIZyAd0LwAFkPgyAHgAcMRUsUgX89SINIATFLJ8hK6QyIgOYVLM6MbkABSyhPjwADSQyajaANZpooiIadzaAHQAlMX0wODgwTRqmdIAsnwIKOhYADwAKgB8kADeUJDAwJAAStyCtCKW0tpTYcwy8krMFZA6C8rwcaXsXQDc1Rsj45PTVnNbS3KK25p+kAoYEpBqWKaoyL4iGJCkiDstluq3g63+gJ2e0gh2Ow1GE3gU3Il0gWUQfEg6hmV2Qi2BK224PRfF27FIggUACMUEchqcAMKzbK8QgaeZ4+5OIhGEzuXhiVCJXzgwXCsmQKkYPSIVCkOknBGIcyPVGtNCYbCYHFvQjIZLLO5rIZhFW+CViDCEXxHAC+1VqKHq2mkAEFiMQwsR2thBoqzqJCIhXnL7DRSEL3DQfeDiNx1T6Jc0E5qOslkMFiD07dVQAwYAyTNowkg4NHNayFA5CUtBRmhLxRKgJPrI0LiFgLJYFPhijDZlIdLJUPgpJ5GMksNJURz8SJxJJI9yLLFNLYhbIRIQlL3KtVtMPR5BXbIHJZUDSjNohQB5b4oFNYdxVms8SDJ8uddOZvp+yARQhBVLXR9EQQxYnYAB1LBfHwQtQPAkwFWGMAhkYABlTUCB1Wd7ibFt8CXZwVxMPtXXICw2k1J5UExc8Q0gWQMFsdQ0JgZjZmwNQg1kWC3ifScMxCSiNVXDIkEKfAHDAwgN0xUxZgo2wknSQQHG5RBfDY35IFMLAsl0rtNH-L4r0EYdsCyYIfmxECDF5UhwWgKoNgAoDpGXBzyUpGlsAAXkgAAGZC820rpLBUutZKpeR3D8QhryQRtZnnZtF03Xw9TAhynJAFz-wzdzQmDSREHYKUZVDAL6lkKRkN0Uh00EQwsDiOzsogyBoO+OC9Hs2I0jCAiyslaV5Cqt4hSkUoBjQmYkmKdrEPIAKloco4Ng2KwFqG0rIAC3b9UQZCNjZSA4kO6bZs2zbtt7TzV1WvqOtIuN4ELHwoUgABaSAAEYNs2+0NntIYHEEGKEuKs1dmu26Ivu4iHP2+be0u6QAH5UcW57luKN6PuYWHfr+yB2GCoZQdciHEm0TZOSJ6FvxCP8NhLZFsbW2J8fjJAe12ABtO7igekwAF1Aap-8aahkkJQpakUDhtnzhRBGRaR2JJbhcHIbpgEgQlZm3FZnQTANSiFBR4Wude3nFHwQXhdF0gJbm53Nb5ABqALhfRyAse+0n2ABub2emS3tbBmW6bFa0JQq8byFNs64j9kqjpm02VaRC51ZdyAegCimbqlnOOY9nlVw6TncZygmhEZ7XQdCxhC1IYtuGkeD+vNgqXmtaQTCH7ApBbSMlCsDA+PebASwzYNMzeSJLC8ESfTijIO4INJdCrGIYukcwrBwuvVwPEdd2c8AL6PbrYJ7l6KJfI033dT1EG9ai-zc9BpEt-A7BjYCzFijEByFda00gG9Vo-MmaBlcCA5WxVc5qwWgAqO1M9bQO4ITKE3lFa+jDqrbGADijyFcFYTB0tsGoF8L4WBcRLZAIQcQaElprTIOFmQ8G+BLBML5qUahkCoYwM-MgJMLRxFplYb+YhqCISmGPKec8l4Eq3nvMgR8Ei7pCMpjrGOOD4ATGGtoyR2iZFCSzMg8O5AARKJPGeC83B1GyDvP4LR4i04I1yMgQQiA9Eg3AC3VCjBwpzESPcXQ-gaKYifAoWi-xmJolIBgJRF4bA6nbp3Us2isTYEfstLwt8xxpH8NJeKIQ+SonkBITc2JrJZWWvwIQuk5S2G1OicIcUWlTC8BEDAnpUAKHWHlG+5tbC2xWoorqMFeoIQcrsOkUzih0IYXzOIAByAAYnqZImy9ErLWYwzZ6EwImF8Aco4Rz6EnPCnqS5ejxmNWUuIlGKyxFUVak8hq+AZTkMGVszCaASCWA6QuVsshWBXOqApQgsUBFfOQMUOO5pShZyGL8-5TFiCIo1FgYoBsoR6NBli+QALcWbJhWSxAFKtkmL2vhdK0KfkTOKqYt5T0Fnczegyo6ZinlwoRejbRKKhTx3RXDGldKRXiMJZCXYJKgA)

## Ejemplo de código

[Example](./iterator.ts)
