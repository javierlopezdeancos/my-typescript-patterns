class Book {
  public title: string;

  public author: string;

  public isbn: string;

  constructor(title: string, author: string, isbn: string) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class BookStored extends Book {
  public sales: number;

  public availability: boolean;

  constructor(title: string, author: string, isbn: string, availability?: boolean, sales?: number) {
    super(title, author, isbn);

    this.sales = sales ? sales : 0;
    this.availability = !!availability;
  }
}

class BookFactory {
  isbns: Set<string> | Set<unknown>;

  constructor() {
    this.isbns = new Set();
  }

  getCount(): number {
    return this.isbns.size;
  }

  createBook(
    title: string,
    author: string,
    isbn: string,
    availability?: boolean,
    sales?: number
  ): Book | null {
    const hasBook = this.isbns.has(isbn);

    if (hasBook) {
      return null;
    }

    const book = new BookStored(title, author, isbn, availability, sales);

    this.isbns.add(isbn);

    return book;
  }
}

class BookCollection {
  books: BookStored[] = [];

  bookFactory: BookFactory;

  constructor() {
    this.bookFactory = new BookFactory();
  }

  getCount(): number {
    return this.books.length;
  }

  add(
    title: string,
    author: string,
    isbn: string,
    availability: boolean,
    sales: number
  ): void {
    const book = this.bookFactory.createBook(title, author, isbn);

    if (!book) {
      return;
    }

    const bookStored: BookStored = {
      ...book,
      sales,
      availability,
      isbn
    };

    this.books.push(bookStored);
  };
}


const books = new BookCollection();

books.add("El Quijote", "Miguel de Cervantes", "ISB-0ABC001", true, 12);
books.add("Ulises", "James Joyce", "ISB-0ABC002", false, 2);
books.add("Fray perico y su borrico", "Juan Muñoz Martín", "ISB-0ABC003", true, 7);
books.add("Fray perico en la guerra", "Juan Muñoz Martín", "ISB-0ABC003", false, 2);
books.add("El alcalde de Zalamea", "Calderón de la Barca", "ISB-0ABC004", false, 1);


console.log(books.getCount())
// Output
// 4
