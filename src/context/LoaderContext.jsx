import { createContext, useContext, useState, useCallback } from "react";

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [loadCount, setLoadCount] = useState(0);

  const showLoader = useCallback(() => setLoadCount((c) => c + 1), []);
  const hideLoader = useCallback(() => setLoadCount((c) => Math.max(c - 1, 0)), []);

  return (
    <LoaderContext.Provider value={{ loading: loadCount > 0, showLoader, hideLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);