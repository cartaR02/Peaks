// UserContext.js
import React, { createContext, useContext } from 'react';

const UserContext = createContext(null);

// Create the provider component
export function UserProvider({ children, user }) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

// Create a custom hook to use the context
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    console.log('user is undefined');
    throw new Error('useUser must be used within a UserProvider');
  }
  console.log('user found');
  return context;
}

// Export the context if you need to use it directly
export default UserContext;
