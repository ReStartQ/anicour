import { ReactNode, createContext, useContext, useState } from 'react';

export const CategoryContext = createContext({});

type CategoryButtonContextProviderProps = {
  children: ReactNode;
};

export const useCategory = () => {
  return useContext(CategoryContext);
};

export const CategoryContextProvider = ({
  children,
}: CategoryButtonContextProviderProps) => {
  const [category, setCategory] = useState(0);

  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
