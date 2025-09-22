import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BookOpen, Search, Users, BarChart } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-library-amber-light/20 to-library-blue/10">
      {/* Header */}
      <header className="glass bg-white/80 backdrop-blur-sm border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-library-blue animate-pulse-glow" />
            <h1 className="text-2xl font-bold font-playfair text-library-blue">LibraryMS</h1>
          </div>
          <nav className="flex gap-3">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button variant="hero">Sign Up</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-6xl font-bold font-playfair gradient-text mb-6 animate-float">
            Online Library Management System
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Search, Borrow, and Manage Books Online with Ease. 
            Your digital gateway to endless knowledge and literary adventures.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/signup">
              <Button variant="premium" size="lg" className="px-8 py-4 text-lg">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="glass" size="lg" className="px-8 py-4 text-lg">
                Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          <Card className="p-6 text-center hover:shadow-xl transition-all duration-500 group animate-fade-in glass">
            <Search className="h-12 w-12 text-library-blue mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-lg font-semibold mb-2 font-playfair">Smart Search</h3>
            <p className="text-muted-foreground">
              Find books instantly by title, author, or category with our intelligent search system.
            </p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-xl transition-all duration-500 group animate-fade-in glass">
            <BookOpen className="h-12 w-12 text-library-amber mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-lg font-semibold mb-2 font-playfair">Easy Borrowing</h3>
            <p className="text-muted-foreground">
              Borrow and return books with just a click. Track your reading history effortlessly.
            </p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-xl transition-all duration-500 group animate-fade-in glass">
            <Users className="h-12 w-12 text-library-blue mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-lg font-semibold mb-2 font-playfair">User Management</h3>
            <p className="text-muted-foreground">
              Secure user accounts with personalized dashboards and borrowing history.
            </p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-xl transition-all duration-500 group animate-fade-in glass">
            <BarChart className="h-12 w-12 text-library-amber mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-lg font-semibold mb-2 font-playfair">Admin Reports</h3>
            <p className="text-muted-foreground">
              Comprehensive reports and analytics for efficient library management.
            </p>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center animate-slide-up">
          <Card className="p-8 glass bg-gradient-to-r from-library-blue/5 to-library-amber/5 border-library-blue/20 hover:shadow-2xl transition-all duration-500">
            <h3 className="text-2xl font-bold font-playfair mb-4">Ready to Start Your Reading Journey?</h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of readers who trust our platform for their literary needs.
            </p>
            <Link to="/signup">
              <Button variant="premium" size="lg">
                Create Account
              </Button>
            </Link>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-library-blue text-white py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="h-6 w-6" />
            <span className="font-semibold">Online Library Management System</span>
          </div>
          <p className="text-library-blue-light">
            Empowering readers and librarians with modern digital solutions.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;