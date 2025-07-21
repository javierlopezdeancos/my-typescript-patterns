type Item = string | number | boolean;

class ItemsIterator<I = Item> {
  private index: number;

  private items: I[];

  constructor(items: I[]) {
    this.index = 0;
    this.items = items;
  }

  public first() {
    this.reset();
    return this.next();
  }

  public next() {
    return this.items[this.index++];
  }

  public hasNext() {
    if (!this?.index ) {
      return false;
    }

    return this.index <= this?.items?.length;
  }

  private reset() {
    this.index = 0;
  }

  public each(callback: (item: I) => void) {
    for (let item = this.first(); this.hasNext(); item = this.next()) {
      callback(item);
    }
  }
}

const items: Item[] = ["one", 2, "circle", true, "Applepie"];

const iterator = new ItemsIterator(items);

// using for loop
for (let i = iterator.first(); iterator.hasNext(); i = iterator.next()) {
  console.log(i);
}

// using Iterator's each method
iterator.each((item: Item): void => {
  console.log(item);
});
