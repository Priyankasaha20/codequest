import { createContext } from "react";

export const AuthContext = createContext({
  isLoading: false,
  error: null,
  user: null,
  login: async () => {},
  register: async () => {},
  fetchUser: async () => {},
});
