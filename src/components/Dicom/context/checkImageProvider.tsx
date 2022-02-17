import {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
} from 'react';

type paramsType = Array<string>;

const ParamsContext = createContext<{
  updateStatePath: string;
  setUpdatePath: Dispatch<string>;
  checkImages: paramsType | [];
  setCheckImages: Dispatch<paramsType | []>;
} | null>(null);

ParamsContext.displayName = 'checkImage';
// useCheckImageContext
const CheckImageContextProvider = ({ children }: { children: ReactNode }) => {
  const [checkImages, setCheckImages] = useState<paramsType | []>([]);
  const [updateStatePath, setUpdatePath] = useState<string>('');
  return (
    <ParamsContext.Provider
      value={{
        checkImages,
        setCheckImages,
        updateStatePath,
        setUpdatePath,
      }}
    >
      {children}
    </ParamsContext.Provider>
  );
};

export default CheckImageContextProvider;

export const useCheckImageContext = () => {
  const context = useContext(ParamsContext);
  if (!context) {
    throw new Error(
      'useCheckImageContext调用必须在CheckImageContextProvider里面',
    );
  }
  return context;
};
