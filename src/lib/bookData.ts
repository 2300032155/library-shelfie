export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  publishedYear: number;
  available: boolean;
  description: string;
  coverUrl?: string;
}

export const BOOKS: Book[] = [
  {
    id: "1",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0-06-112008-4",
    category: "Classic Literature",
    publishedYear: 1960,
    available: true,
    description: "A classic novel about racial injustice and childhood innocence in the American South."
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    isbn: "978-0-452-28423-4",
    category: "Dystopian Fiction",
    publishedYear: 1949,
    available: true,
    description: "A dystopian social science fiction novel and cautionary tale."
  },
  {
    id: "3",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "978-0-14-143951-8",
    category: "Romance",
    publishedYear: 1813,
    available: false,
    description: "A romantic novel that critiques the British landed gentry at the end of the 18th century."
  },
  {
    id: "4",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0-7432-7356-5",
    category: "Classic Literature",
    publishedYear: 1925,
    available: true,
    description: "A novel about the American Dream and the Jazz Age."
  },
  {
    id: "5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    isbn: "978-0-316-76948-0",
    category: "Coming of Age",
    publishedYear: 1951,
    available: true,
    description: "A controversial novel about teenage rebellion and alienation."
  },
  {
    id: "6",
    title: "Lord of the Flies",
    author: "William Golding",
    isbn: "978-0-571-05686-2",
    category: "Adventure",
    publishedYear: 1954,
    available: false,
    description: "A novel about British boys stranded on a deserted island."
  },
  {
    id: "7",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    isbn: "978-0-547-92822-7",
    category: "Fantasy",
    publishedYear: 1937,
    available: true,
    description: "A children's fantasy novel about a hobbit's unexpected journey."
  },
  {
    id: "8",
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    isbn: "978-0-439-70818-8",
    category: "Fantasy",
    publishedYear: 1997,
    available: true,
    description: "The first book in the Harry Potter series about a young wizard."
  },
  {
    id: "9",
    title: "The Da Vinci Code",
    author: "Dan Brown",
    isbn: "978-0-385-50420-1",
    category: "Mystery",
    publishedYear: 2003,
    available: false,
    description: "A mystery thriller novel involving art, history, and religion."
  },
  {
    id: "10",
    title: "The Alchemist",
    author: "Paulo Coelho",
    isbn: "978-0-06-112241-5",
    category: "Philosophy",
    publishedYear: 1988,
    available: true,
    description: "A philosophical novel about following one's dreams."
  },
  {
    id: "11",
    title: "Brave New World",
    author: "Aldous Huxley",
    isbn: "978-0-06-085052-4",
    category: "Science Fiction",
    publishedYear: 1932,
    available: true,
    description: "A dystopian novel set in a futuristic World State."
  },
  {
    id: "12",
    title: "The Book Thief",
    author: "Markus Zusak",
    isbn: "978-0-375-83100-3",
    category: "Historical Fiction",
    publishedYear: 2005,
    available: true,
    description: "A novel set in Nazi Germany, narrated by Death."
  }
];

export interface BorrowedBook {
  id: string;
  bookId: string;
  userId: string;
  borrowedDate: string;
  dueDate: string;
  returned: boolean;
  returnedDate?: string;
}

// Utility functions for managing book borrowing
export const getBorrowedBooks = (userId: string): BorrowedBook[] => {
  const borrowed = localStorage.getItem('borrowedBooks');
  if (!borrowed) return [];
  
  const allBorrowed = JSON.parse(borrowed) as BorrowedBook[];
  return allBorrowed.filter(b => b.userId === userId && !b.returned);
};

export const borrowBook = (bookId: string, userId: string): boolean => {
  try {
    // Get current borrowed books
    const borrowed = JSON.parse(localStorage.getItem('borrowedBooks') || '[]') as BorrowedBook[];
    
    // Check if book is already borrowed by this user
    const alreadyBorrowed = borrowed.find(b => b.bookId === bookId && b.userId === userId && !b.returned);
    if (alreadyBorrowed) return false;
    
    // Create new borrow record
    const borrowRecord: BorrowedBook = {
      id: Date.now().toString(),
      bookId,
      userId,
      borrowedDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks from now
      returned: false
    };
    
    borrowed.push(borrowRecord);
    localStorage.setItem('borrowedBooks', JSON.stringify(borrowed));
    
    // Update book availability
    updateBookAvailability(bookId, false);
    
    return true;
  } catch (error) {
    console.error('Error borrowing book:', error);
    return false;
  }
};

export const returnBook = (bookId: string, userId: string): boolean => {
  try {
    const borrowed = JSON.parse(localStorage.getItem('borrowedBooks') || '[]') as BorrowedBook[];
    const bookRecord = borrowed.find(b => b.bookId === bookId && b.userId === userId && !b.returned);
    
    if (bookRecord) {
      bookRecord.returned = true;
      bookRecord.returnedDate = new Date().toISOString();
      
      localStorage.setItem('borrowedBooks', JSON.stringify(borrowed));
      
      // Update book availability
      updateBookAvailability(bookId, true);
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error returning book:', error);
    return false;
  }
};

const updateBookAvailability = (bookId: string, available: boolean) => {
  // In a real app, this would update the database
  // For now, we'll use a separate storage for book availability overrides
  const overrides = JSON.parse(localStorage.getItem('bookAvailability') || '{}');
  overrides[bookId] = available;
  localStorage.setItem('bookAvailability', JSON.stringify(overrides));
};

export const getBookAvailability = (bookId: string): boolean => {
  const overrides = JSON.parse(localStorage.getItem('bookAvailability') || '{}');
  if (overrides.hasOwnProperty(bookId)) {
    return overrides[bookId];
  }
  
  const book = BOOKS.find(b => b.id === bookId);
  return book ? book.available : false;
};

export const getBookWithAvailability = (bookId: string): Book | undefined => {
  const book = BOOKS.find(b => b.id === bookId);
  if (!book) return undefined;
  
  return {
    ...book,
    available: getBookAvailability(bookId)
  };
};

export const getAllBooksWithAvailability = (): Book[] => {
  return BOOKS.map(book => ({
    ...book,
    available: getBookAvailability(book.id)
  }));
};