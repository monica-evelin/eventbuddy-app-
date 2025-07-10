import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const auth = firebase.auth();
const database = firebase.firestore();

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log("Usuário autenticado:", currentUser); // 👈 Aqui!
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    await auth.signOut();
  };

  const signUp = async (email, password) => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const newUser = userCredential.user;

      await database.collection("users").doc(newUser.uid).set({
        favorites: [],
        participations: [],
      });

      setUser(newUser);
    } catch (error) {
      console.error("Erro ao registrar:", error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
