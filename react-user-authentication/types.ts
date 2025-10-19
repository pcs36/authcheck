
export interface User {
  id: string; // Will be the email
  firstName: string;
  lastName: string;
  email: string;
  // NOTE: Storing plaintext passwords is a major security risk.
  // This is for demonstration purposes only. In a real app,
  // passwords should be securely hashed and salted.
  password: string;
}

export interface AuthContextType {
  // user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}
