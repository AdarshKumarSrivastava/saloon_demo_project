"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Gender = "Male" | "Female";

interface GenderContextType {
  gender: Gender;
  toggleGender: (g: Gender) => void;
}

const GenderContext = createContext<GenderContextType | undefined>(undefined);

export function GenderProvider({ children }: { children: React.ReactNode }) {
  const [gender, setGender] = useState<Gender>("Female");

  useEffect(() => {
    const saved = localStorage.getItem("saloon_gender");
    if (saved === "Male" || saved === "Female") {
      setGender(saved);
    }
  }, []);

  const toggleGender = (newGender: Gender) => {
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
  const context = useContext(GenderContext);
  if (context === undefined) {
    throw new Error("useGender must be used within a GenderProvider");
  }
  return context;
}
