import { createContext, useState } from "react";

export const WorkContext = createContext();

export const WorkContextProvider = ({ children }) => {
  const [isletme, setIsletme] = useState();

  return (
    <WorkContext.Provider value={[isletme, setIsletme]}>
      {children}
    </WorkContext.Provider>
  );
};
