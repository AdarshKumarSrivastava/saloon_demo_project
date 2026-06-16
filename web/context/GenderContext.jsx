"use client";

import { createContext, useContext, useState, useEffect } from "react";

const GenderContext = createContext();

export function GenderProvider({ children }) {
  const [gender, setGender] = useState("Female");

  // On mount, load from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem("saloon_gender");
    if (saved === "Male" || saved === "Female") {
      setGender(saved);
    }
  }, []);

  const toggleGender = (newGender) => {
    setGender(newGender);
    localStorage.setItem("saloon_gender", newGender);
  };

  return (
    <GenderContext.Provider value={{ gender, toggleGender }}>
      {children}
    </GenderContext.Provider>
  );
}

export function useGender() {
  return useContext(GenderContext);
}
