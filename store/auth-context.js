import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";
import { supabase } from "../config/supabase";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();

  async function authenticate(token) {
    setAuthToken(token);
    await AsyncStorage.setItem("token", token);

    // Set the session in Supabase
    await supabase.auth.setSession({
      access_token: token,
      refresh_token: token,
    });
  }

  async function logout() {
    setAuthToken(null);
    await AsyncStorage.removeItem("token");

    // Sign out from Supabase
    await supabase.auth.signOut();
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
