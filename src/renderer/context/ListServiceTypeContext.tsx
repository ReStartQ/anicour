import { createContext, useState, useContext, ReactNode } from 'react';

type ListServiceTypeContextProviderProps = {
  children: ReactNode;
};

export const ListServiceTypeContext = createContext({});

export const useListServiceType = () => {
  return useContext(ListServiceTypeContext);
};

export const ListServiceTypeContextProvider = ({
  children,
}: ListServiceTypeContextProviderProps) => {
  const [listServiceType, setListServiceType] = useState(false);

  const toggleListServiceType = () => {
    setListServiceType(!listServiceType);
  };

  return (
    <ListServiceTypeContext.Provider
      value={{ listServiceType, toggleListServiceType }}
    >
      {children}
    </ListServiceTypeContext.Provider>
  );
};
