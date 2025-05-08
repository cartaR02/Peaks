// UserContext.js
import React, { createContext, useContext } from 'react';

// Create the context with null as default value
const UserContext = createContext(null);

// Create the provider component
export function UserProvider({ children, user }) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

// Create a custom hook to use the context
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

// Export the context if you need to use it directly
export default UserContext;
