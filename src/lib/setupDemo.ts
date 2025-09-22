// Setup demo data for the library system
export const setupDemoData = () => {
  // Check if demo data already exists
  const existingUsers = localStorage.getItem('users');
  
  if (!existingUsers) {
    // Create demo admin user
    const demoUsers = [
      {
        id: '1',
        fullName: 'Admin User',
        email: 'admin@library.com',
        password: 'password123',
        isAdmin: true
      },
      {
        id: '2',
        fullName: 'John Reader',
        email: 'john@example.com',
        password: 'password123',
        isAdmin: false
      }
    ];
    
    localStorage.setItem('users', JSON.stringify(demoUsers));
  }
  
  // Initialize empty borrowed books if not exists
  const existingBorrowedBooks = localStorage.getItem('borrowedBooks');
  if (!existingBorrowedBooks) {
    localStorage.setItem('borrowedBooks', JSON.stringify([]));
  }
  
  // Initialize book availability overrides if not exists
  const existingAvailability = localStorage.getItem('bookAvailability');
  if (!existingAvailability) {
    localStorage.setItem('bookAvailability', JSON.stringify({}));
  }
};

// Call setup on app initialization
if (typeof window !== 'undefined') {
  setupDemoData();
}