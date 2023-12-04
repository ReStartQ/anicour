import {
  createContext,
  useState,
  useReducer,
  useContext,
  ReactNode,
} from 'react';

const defaultMedia = null;

type AdvancedInputContextProviderProps = {
  children: ReactNode;
};

export const AdvancedInputContext = createContext({});

export const useAdvancedInput = () => {
  return useContext(AdvancedInputContext);
};

export const AdvancedInputContextReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'getMediaListEntry':
      return action.payload;
    case 'updateProgress':
      return {
        ...state,
        progress: action.payload,
      };
    case 'updateProgressVolumes':
      return {
        ...state,
        progressVolumes: action.payload,
      };
    case 'updateRepeat':
      return {
        ...state,
        repeat: action.payload,
      };
    case 'updateStatus':
      return {
        ...state,
        status: action.payload,
      };
    case 'updateScore':
      return {
        ...state,
        score: action.payload,
      };
    case 'updateNotes':
      return {
        ...state,
        notes: action.payload,
      };
    case 'updateStartedAt':
      return {
        ...state,
        startedAt: action.payload,
      };
    case 'updateCompletedAt':
      return {
        ...state,
        completedAt: action.payload,
      };
    case 'updatePrivate':
      return {
        ...state,
        private: action.payload,
      };
    default:
      return state;
  }
};

export const AdvancedInputContextProvider = ({
  children,
}: AdvancedInputContextProviderProps) => {
  // window.electron.store.get('advancedInput')
  const [advancedInput, dispatch] = useReducer(
    AdvancedInputContextReducer,
    defaultMedia,
  );

  return (
    <AdvancedInputContext.Provider value={{ advancedInput, dispatch }}>
      {children}
    </AdvancedInputContext.Provider>
  );
};
