import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { getAllBooksWithAvailability } from '@/lib/bookData';
import { BarChart3, Users, BookOpen, TrendingUp, ArrowLeft, User, PieChart, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Reports = () => {
  const [isAdminView, setIsAdminView] = useState(false);
  const { user, logout } = useAuth();
  
  const allBooks = getAllBooksWithAvailability();
  
  const stats = useMemo(() => {
    const totalBooks = allBooks.length;
    const availableBooks = allBooks.filter(book => book.available).length;
    const borrowedBooks = totalBooks - availableBooks;
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const totalUsers = users.length;
    
    // Get borrowed records
    const borrowedRecords = JSON.parse(localStorage.getItem('borrowedBooks') || '[]');
    const activeBorrows = borrowedRecords.filter((record: any) => !record.returned).length;
    
    // Category distribution
    const categoryCount = allBooks.reduce((acc, book) => {
      acc[book.category] = (acc[book.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      totalBooks,
      availableBooks,
      borrowedBooks,
      totalUsers,
      activeBorrows,
      categoryCount,
      utilizationRate: totalBooks > 0 ? (borrowedBooks / totalBooks * 100).toFixed(1) : '0'
    };
  }, [allBooks]);

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
              <BarChart3 className="h-8 w-8 text-library-blue" />
              <h1 className="text-2xl font-bold text-library-blue">Reports & Analytics</h1>
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
        {/* Admin View Toggle */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>View Options</span>
              <div className="flex items-center space-x-2">
                <Label htmlFor="admin-mode" className="text-sm">Admin View</Label>
                <Switch
                  id="admin-mode"
                  checked={isAdminView}
                  onCheckedChange={setIsAdminView}
                />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {isAdminView 
                ? "Viewing comprehensive library statistics and management data."
                : "Viewing basic library information and personal statistics."
              }
            </p>
          </CardContent>
        </Card>

        {/* Main Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-library-blue/10 rounded-lg">
                  <BookOpen className="h-6 w-6 text-library-blue" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Books</p>
                  <p className="text-2xl font-bold">{stats.totalBooks}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-library-success/10 rounded-lg">
                  <BookOpen className="h-6 w-6 text-library-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Available Books</p>
                  <p className="text-2xl font-bold">{stats.availableBooks}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-library-warning/10 rounded-lg">
                  <BookOpen className="h-6 w-6 text-library-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Borrowed Books</p>
                  <p className="text-2xl font-bold">{stats.borrowedBooks}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {isAdminView && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-library-amber/10 rounded-lg">
                    <Users className="h-6 w-6 text-library-amber" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Registered Users</p>
                    <p className="text-2xl font-bold">{stats.totalUsers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Detailed Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Utilization Rate */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Library Utilization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Utilization Rate</span>
                  <span className="text-2xl font-bold text-library-blue">{stats.utilizationRate}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className="bg-library-blue h-3 rounded-full transition-all duration-500"
                    style={{ width: `${stats.utilizationRate}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-3 bg-library-success/5 rounded-lg">
                    <div className="font-semibold text-library-success">{stats.availableBooks}</div>
                    <div className="text-muted-foreground">Available</div>
                  </div>
                  <div className="text-center p-3 bg-library-warning/5 rounded-lg">
                    <div className="font-semibold text-library-warning">{stats.borrowedBooks}</div>
                    <div className="text-muted-foreground">Borrowed</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Books by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(stats.categoryCount)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 6)
                  .map(([category, count]) => {
                    const percentage = ((count / stats.totalBooks) * 100).toFixed(1);
                    return (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{count} books</span>
                          <span className="text-xs bg-muted px-2 py-1 rounded">{percentage}%</span>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin-Only Sections */}
        {isAdminView && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  System Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-library-blue/5 rounded-lg">
                    <div className="text-3xl font-bold text-library-blue mb-2">{stats.activeBorrows}</div>
                    <div className="text-sm text-muted-foreground">Active Borrowings</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Books currently checked out
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-library-amber/5 rounded-lg">
                    <div className="text-3xl font-bold text-library-amber mb-2">
                      {stats.totalUsers > 0 ? (stats.activeBorrows / stats.totalUsers).toFixed(1) : '0'}
                    </div>
                    <div className="text-sm text-muted-foreground">Avg. Books per User</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Average borrowing activity
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-library-success/5 rounded-lg">
                    <div className="text-3xl font-bold text-library-success mb-2">
                      {((stats.availableBooks / stats.totalBooks) * 100).toFixed(0)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Availability Rate</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Books ready for borrowing
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline" size="sm">
                    Export Reports
                  </Button>
                  <Button variant="outline" size="sm">
                    View Overdue Books
                  </Button>
                  <Button variant="outline" size="sm">
                    User Analytics
                  </Button>
                  <Button variant="outline" size="sm">
                    Inventory Management
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Personal Statistics (Non-Admin) */}
        {!isAdminView && user && (
          <Card>
            <CardHeader>
              <CardTitle>Your Library Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-library-blue/5 rounded-lg">
                  <div className="text-2xl font-bold text-library-blue">
                    {JSON.parse(localStorage.getItem('borrowedBooks') || '[]')
                      .filter((b: any) => b.userId === user.id).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Borrowed</div>
                </div>
                
                <div className="text-center p-4 bg-library-success/5 rounded-lg">
                  <div className="text-2xl font-bold text-library-success">
                    {JSON.parse(localStorage.getItem('borrowedBooks') || '[]')
                      .filter((b: any) => b.userId === user.id && b.returned).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Books Returned</div>
                </div>
                
                <div className="text-center p-4 bg-library-warning/5 rounded-lg">
                  <div className="text-2xl font-bold text-library-warning">
                    {JSON.parse(localStorage.getItem('borrowedBooks') || '[]')
                      .filter((b: any) => b.userId === user.id && !b.returned).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Currently Reading</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Reports;