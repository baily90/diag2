import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useState,
} from 'react';

type recordDicomsType = {
  app: object;
  dicomState: {
    toJSON: (e: object) => void;
    apply: (e: object, data: object) => void;
  };
};

const RecordDicomPaint = createContext<{
  recordDicoms: Array<recordDicomsType> | [];
  setRecordDicoms: Dispatch<Array<recordDicomsType> | []>;
} | null>(null);

RecordDicomPaint.displayName = 'RecordDicomPaint';

const RecordDicomPaintProvider = ({ children }: { children: ReactNode }) => {
  const [recordDicoms, setRecordDicoms] = useState<
    Array<recordDicomsType> | []
  >([]);

  return (
    <RecordDicomPaint.Provider value={{ recordDicoms, setRecordDicoms }}>
      {children}
    </RecordDicomPaint.Provider>
  );
};

export default RecordDicomPaintProvider;

export const useRecordDicomPaint = () => {
  const context = useContext(RecordDicomPaint);
  if (!context) {
    throw new Error(
      'useRecordDicomPaint调用必须在RecordDicomPaintProvider里面',
    );
  }
  return context;
};
