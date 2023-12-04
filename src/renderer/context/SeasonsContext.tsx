import {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useState,
} from 'react';

export const SeasonContext = createContext({});

type SeasonContextProviderProps = {
  children: ReactNode;
};

export const useSeason = () => {
  return useContext(SeasonContext);
};
export const seasonList: any = [
  {
    titleRomaji: 'Hyouka',
    image: 'https://cdn.myanimelist.net/images/anime/1932/127228l.jpg',
    key: 0,
  },
];

async function getSeasons() {
  console.log('h');
}

export const SeasonUpdater = (state: any, action: any) => {
  switch (action.type) {
    case 'Update':
      return [];
    case 'Add':
      return [];
    case 'Remove':
      return [];
    default:
      throw new Error();
  }
};

export const SeasonContextProvider = ({
  children,
}: SeasonContextProviderProps) => {
  const [Season, setSeason] = useState([]);

  return (
    <SeasonContext.Provider value={{ Season, setSeason }}>
      {children}
    </SeasonContext.Provider>
  );
};
