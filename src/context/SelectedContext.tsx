import React, { createContext, useContext, useState } from "react";

type SelectedContextType = {
  selected: "home" | "create";
  setSelected: React.Dispatch<React.SetStateAction<"home" | "create">>;
};

const SelectedContext = createContext<SelectedContextType | undefined>(undefined);

export const SelectedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selected, setSelected] = useState<"home" | "create">("create");

  return (
    <SelectedContext.Provider value={{ selected, setSelected }}>
      {children}
    </SelectedContext.Provider>
  );
};

export const useSelected = () => {
  const context = useContext(SelectedContext);
  if (!context) {
    throw new Error("useSelected must be used within a SelectedProvider");
  }
  return context;
};