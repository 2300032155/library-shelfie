import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { getBorrowedBooks, returnBook, getBookWithAvailability, BorrowedBook } from '@/lib/bookData';
import { BookOpen, Calendar, User, ArrowLeft, Clock, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

const BorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const loadBorrowedBooks = () => {
    if (user) {
      const books = getBorrowedBooks(user.id);
      setBorrowedBooks(books);
    }
  };

  useEffect(() => {
    loadBorrowedBooks();
  }, [user]);

  const handleReturnBook = async (bookId: string, bookTitle: string) => {
    if (!user) return;

    const success = returnBook(bookId, user.id);
    
    if (success) {
      toast({
        title: "Book Returned Successfully",
        description: `"${bookTitle}" has been returned to the library.`,
      });
      loadBorrowedBooks(); // Refresh the list
    } else {
      toast({
        title: "Return Failed",
        description: "An error occurred while returning the book.",
        variant: "destructive",
      });
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-library-amber-light/20 to-library-blue/10">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-library-blue" />
              <h1 className="text-2xl font-bold text-library-blue">Borrowed Books</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{user?.fullName}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Summary Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Your Reading Collection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-library-blue/5 rounded-lg">
                <div className="text-2xl font-bold text-library-blue">{borrowedBooks.length}</div>
                <div className="text-sm text-muted-foreground">Currently Borrowed</div>
              </div>
              <div className="text-center p-4 bg-library-warning/5 rounded-lg">
                <div className="text-2xl font-bold text-library-warning">
                  {borrowedBooks.filter(book => isOverdue(book.dueDate)).length}
                </div>
                <div className="text-sm text-muted-foreground">Overdue</div>
              </div>
              <div className="text-center p-4 bg-library-success/5 rounded-lg">
                <div className="text-2xl font-bold text-library-success">
                  {borrowedBooks.filter(book => getDaysUntilDue(book.dueDate) > 0 && getDaysUntilDue(book.dueDate) <= 3).length}
                </div>
                <div className="text-sm text-muted-foreground">Due Soon</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {borrowedBooks.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No borrowed books</h3>
              <p className="text-muted-foreground mb-6">
                You haven't borrowed any books yet. Start exploring our collection!
              </p>
              <Link to="/search">
                <Button variant="hero">
                  Browse Books
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {borrowedBooks.map((borrowedBook) => {
              const book = getBookWithAvailability(borrowedBook.bookId);
              const daysUntilDue = getDaysUntilDue(borrowedBook.dueDate);
              const overdue = isOverdue(borrowedBook.dueDate);
              
              if (!book) return null;

              return (
                <Card key={borrowedBook.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge 
                        variant={overdue ? "destructive" : daysUntilDue <= 3 ? "secondary" : "default"}
                      >
                        {overdue ? (
                          <>⚠️ Overdue</>
                        ) : daysUntilDue <= 3 ? (
                          <>⏰ Due Soon</>
                        ) : (
                          <>✓ Active</>
                        )}
                      </Badge>
                      <Badge variant="outline">{book.category}</Badge>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{book.title}</CardTitle>
                    <p className="text-muted-foreground flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {book.author}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Borrowed: {new Date(borrowedBook.borrowedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Due: {new Date(borrowedBook.dueDate).toLocaleDateString()}</span>
                        </div>
                        {daysUntilDue >= 0 ? (
                          <p className={`text-sm font-medium ${
                            daysUntilDue <= 3 ? 'text-library-warning' : 'text-library-success'
                          }`}>
                            {daysUntilDue === 0 ? 'Due Today' : 
                             daysUntilDue === 1 ? 'Due Tomorrow' : 
                             `${daysUntilDue} days remaining`}
                          </p>
                        ) : (
                          <p className="text-sm font-medium text-destructive">
                            {Math.abs(daysUntilDue)} days overdue
                          </p>
                        )}
                      </div>

                      <Button 
                        variant={overdue ? "destructive" : "outline"}
                        size="sm" 
                        className="w-full"
                        onClick={() => handleReturnBook(book.id, book.title)}
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Return Book
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 flex justify-center">
          <Link to="/search">
            <Button variant="hero">
              <BookOpen className="h-4 w-4 mr-2" />
              Browse More Books
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default BorrowedBooks;