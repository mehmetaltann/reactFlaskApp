import { createContext, useState } from "react";

export const WorkContext = createContext();

export const WorkContextProvider = ({ children }) => {
  const [isletme, setIsletme] = useState();

  console.log(isletme);

  return (
    <WorkContext.Provider value={[isletme, setIsletme]}>
      {children}
    </WorkContext.Provider>
  );
};
