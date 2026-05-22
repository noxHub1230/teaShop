import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getCurrentUser,
  signInWithEmail,
  signOut,
  signUpWithEmail,
} from "./authAPI";

const authContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isAuthModelOpen, setIsAuthModelOpen] = useState(false);
  const [afterLoginAction, setAfterLoginAction] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("teaShop_accessToken");

    if (!savedToken) return;

    setAccessToken(savedToken);

    getCurrentUser(savedToken)
      .then((currentUser) => {
        setUser(currentUser);
      })
      .catch(() => {
        localStorage.removeItem("teaShop_accessToken");
        setAccessToken(null);
        setUser(null);
      });
  }, []);

  const openAuthModel = (callback = null) => {
    setAfterLoginAction(() => callback);
    setIsAuthModelOpen(true);
  };

  const closeAuthModel = () => {
    setIsAuthModelOpen(false);
    setAfterLoginAction(null);
  };

  const saveSession = (data) => {
    setAccessToken(data.access_token);
    setUser(data.user);
    localStorage.setItem("teaShop_accessToken", data.access_token);
  };

  const login = async (email, password) => {
    const data = await signInWithEmail(email, password);

    saveSession(data);
    setIsAuthModelOpen(false);

    if (afterLoginAction) {
      afterLoginAction();
      setAfterLoginAction(null);
    }
  };

  const register = async (email, password) => {
    const data = await signUpWithEmail(email, password);
    return data;
  };

  const logout = async () => {
    if (accessToken) {
      await signOut(accessToken);
    }

    localStorage.removeItem("teaShop_accessToken");
    setAccessToken(null);
    setUser(null);
  };

  return (
    <authContext.Provider
      value={{
        user,
        accessToken,
        isAuthModelOpen,
        openAuthModel,
        closeAuthModel,
        login,
        register,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
