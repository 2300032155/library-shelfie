import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { getAllBooksWithAvailability, borrowBook, Book } from '@/lib/bookData';
import { BookOpen, Search, Calendar, User, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const SearchBooks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  const allBooks = getAllBooksWithAvailability();

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(allBooks.map(book => book.category)));
  }, [allBooks]);

  // Filter books based on search and category
  const filteredBooks = useMemo(() => {
    return allBooks.filter(book => {
      const matchesSearch = searchQuery === '' || 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === '' || book.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [allBooks, searchQuery, selectedCategory]);

  const handleBorrowBook = async (book: Book) => {
    if (!user) return;

    if (!book.available) {
      toast({
        title: "Book Unavailable",
        description: "This book is currently not available for borrowing.",
        variant: "destructive",
      });
      return;
    }

    const success = borrowBook(book.id, user.id);
    
    if (success) {
      toast({
        title: "Book Borrowed Successfully",
        description: `You have borrowed "${book.title}". Due date is 2 weeks from today.`,
      });
      // Force re-render by updating search query
      setSearchQuery(prev => prev + ' ');
      setSearchQuery(prev => prev.trim());
    } else {
      toast({
        title: "Borrowing Failed",
        description: "You may have already borrowed this book or an error occurred.",
        variant: "destructive",
      });
    }
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
              <h1 className="text-2xl font-bold text-library-blue">Search Books</h1>
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
        {/* Search Controls */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Find Your Next Great Read
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by title or author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="md:w-48">
                <select
                  className="w-full h-12 px-3 border border-input rounded-md bg-background"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Found {filteredBooks.length} books
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <Card key={book.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={book.available ? "default" : "secondary"} className="mb-2">
                    {book.available ? (
                      <><CheckCircle className="h-3 w-3 mr-1" /> Available</>
                    ) : (
                      <><XCircle className="h-3 w-3 mr-1" /> Borrowed</>
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
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {book.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{book.publishedYear}</span>
                    <span>•</span>
                    <span>ISBN: {book.isbn}</span>
                  </div>

                  <div className="pt-3">
                    {book.available ? (
                      <Button 
                        variant="hero" 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleBorrowBook(book)}
                      >
                        Borrow Book
                      </Button>
                    ) : (
                      <Button variant="secondary" size="sm" className="w-full" disabled>
                        Currently Borrowed
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No books found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or category filter.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchBooks;