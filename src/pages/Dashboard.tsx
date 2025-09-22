import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, Search, Library, BarChart3, LogOut, User, Clock } from 'lucide-react';
import { getBorrowedBooks } from '@/lib/bookData';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const borrowedBooks = user ? getBorrowedBooks(user.id) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-library-amber-light/20 to-library-blue/10">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-library-blue" />
            <h1 className="text-2xl font-bold text-library-blue">LibraryMS</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{user?.fullName}</span>
              {user?.isAdmin && (
                <span className="bg-library-amber text-xs px-2 py-1 rounded-full font-medium">
                  Admin
                </span>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-4xl font-bold font-playfair gradient-text mb-4 animate-float">
            Welcome back, {user?.fullName}!
          </h2>
          <p className="text-lg text-muted-foreground">
            Ready to explore your digital library today?
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="group hover:shadow-xl transition-all duration-500 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-library-blue/10 rounded-lg group-hover:bg-library-blue/20 transition-colors duration-300">
                  <Library className="h-6 w-6 text-library-blue group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Books Available</p>
                  <p className="text-2xl font-bold font-playfair">2,540+</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-500 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-library-amber/10 rounded-lg group-hover:bg-library-amber/20 transition-colors duration-300">
                  <BookOpen className="h-6 w-6 text-library-amber group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Currently Borrowed</p>
                  <p className="text-2xl font-bold font-playfair">{borrowedBooks.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-500 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-library-success/10 rounded-lg group-hover:bg-library-success/20 transition-colors duration-300">
                  <Clock className="h-6 w-6 text-library-success group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reading Hours</p>
                  <p className="text-2xl font-bold font-playfair">24+</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link to="/search">
            <Card className="book-card hover:shadow-2xl hover:shadow-library-blue/20 transition-all duration-500 cursor-pointer group glass">
              <CardHeader className="text-center">
                <div className="mx-auto p-4 bg-library-blue/10 rounded-full group-hover:bg-library-blue/20 transition-colors duration-300 animate-pulse-glow">
                  <Search className="h-8 w-8 text-library-blue group-hover:scale-125 transition-transform duration-300" />
                </div>
                <CardTitle className="text-lg font-playfair">Search Books</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Find books by title, author, or category
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/borrowed">
            <Card className="book-card hover:shadow-2xl hover:shadow-library-amber/20 transition-all duration-500 cursor-pointer group glass">
              <CardHeader className="text-center">
                <div className="mx-auto p-4 bg-library-amber/10 rounded-full group-hover:bg-library-amber/20 transition-colors duration-300">
                  <Library className="h-8 w-8 text-library-amber group-hover:scale-125 transition-transform duration-300" />
                </div>
                <CardTitle className="text-lg font-playfair">Borrowed Books</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Manage your current borrowed books
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/reports">
            <Card className="book-card hover:shadow-2xl hover:shadow-library-success/20 transition-all duration-500 cursor-pointer group glass">
              <CardHeader className="text-center">
                <div className="mx-auto p-4 bg-library-success/10 rounded-full group-hover:bg-library-success/20 transition-colors duration-300">
                  <BarChart3 className="h-8 w-8 text-library-success group-hover:scale-125 transition-transform duration-300" />
                </div>
                <CardTitle className="text-lg font-playfair">Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  View library statistics and reports
                </p>
              </CardContent>
            </Card>
          </Link>

          <Card className="book-card hover:shadow-2xl transition-all duration-500 cursor-pointer group bg-gradient-to-br from-library-blue/5 to-library-amber/5 glass">
            <CardHeader className="text-center">
              <div className="mx-auto p-4 bg-library-blue/10 rounded-full group-hover:bg-library-blue/20 transition-colors duration-300">
                <BookOpen className="h-8 w-8 text-library-blue group-hover:scale-125 transition-transform duration-300" />
              </div>
              <CardTitle className="text-lg font-playfair">Quick Access</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Bookmarks and recent activity
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        {borrowedBooks.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Borrowed Books</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {borrowedBooks.slice(0, 3).map((book) => (
                  <div key={book.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Book ID: {book.bookId}</p>
                      <p className="text-sm text-muted-foreground">
                        Borrowed: {new Date(book.borrowedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Due: {new Date(book.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
              {borrowedBooks.length > 3 && (
                <div className="mt-4 text-center">
                  <Link to="/borrowed">
                    <Button variant="outline" size="sm">
                      View All Borrowed Books
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Dashboard;