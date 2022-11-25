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

const isbns = new Set();

type BookStored extends Book = {
  sales: number,
  availibility: boolean,
  isbn: string,
}

const books: BookStored[] = [];

const createBook = (title: string, author: string, isbn: string) => {
  const hasBook = isbns.has(isbn);

  if (hasBook) {
    return hasBook;
  } else {
    const book = new Book(title, author, isbn);

    isbns.add(isbn);

    return book;
  }
};

const addBook = (title: string, author: string, isbn: string, availibility: boolean, sales: number) => {
  const bookStored: BookStored = {
    createBook(title, author, isbn),
    sales,
    availibility,
    isbn
  };

  books.push(book);

  return book;
};
