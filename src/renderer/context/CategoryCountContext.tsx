import { ReactNode, createContext, useContext, useState } from 'react';

export const CategoryCountContext = createContext({});

type CategoryCountButtonContextProviderProps = {
  children: ReactNode;
};

export const useCategoryCount = () => {
  return useContext(CategoryCountContext);
};

export const CategoryCountContextProvider = ({
  children,
}: CategoryCountButtonContextProviderProps) => {
  const [categoryCount, setCategoryCount] = useState(0);
  // object that tracks the number of anime for the category (watching, reading, reading2, completed, etc)
  // find a way to go to electron store from this context and communicate it with a function
  // window.electron.ipcRenderer.sendMessage('settings', ['ping'])
  const sendMessageToElectronStore = () => {
    window.electron.ipcRenderer.sendMessage('settings', ['ping']);
  };

  return (
    <CategoryCountContext.Provider value={{ categoryCount, setCategoryCount }}>
      {children}
    </CategoryCountContext.Provider>
  );
};
