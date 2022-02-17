import { useEffect, useState, Fragment } from 'react';
import get from 'lodash/get';
import DicomsList from './components/list';
import DicomCheck from './components/dicomCheck';
import './index.less';

const DicomJsx = ({
  dicomLists,
  disabled = false,
}: {
  dicomLists: Array<{
    title?: string;
    lists: Array<{
      id: number;
      source_url: string;
      mm_per_pixel?: number;
      source_type: number;
      markData?: '{}';
    }>;
  }>;
  disabled?: boolean;
}) => {
  const [listsData, setListsData] = useState<Array<any>>([]);
  const [index, setIndex] = useState<number>(0);
  const [actived, setActived] = useState<number>(-1);

  useEffect(() => {
    const arr: Array<{
      id: number;
      source_url: string;
      mm_per_pixel?: number;
      source_type: number;
      markData?: {};
    }> = [];
    dicomLists.forEach((item) => arr.push(...item.lists));
    const id = get(dicomLists, '0.lists[0].id', -1);
    setActived(id);
    setListsData(arr);
  }, [dicomLists]);

  const getDicomById = (e: number) => {
    const index = listsData.findIndex((item) => item.id === e);
    setActived(e);
    setIndex(index);
  };

  return (
    <div className="dicom-container">
      <div className="dicom-source-list">
        {dicomLists.map((item, index) => (
          <Fragment key={index}>
            {item.title && <h2 style={{ fontSize: 14 }}>{item.title}</h2>}
            <div style={{ marginBottom: 20 }}>
              <DicomsList
                actived={actived}
                dicomLists={item.lists}
                getDicomById={getDicomById}
              />
            </div>
          </Fragment>
        ))}
      </div>
      <div className="dicom-content-wrap">
        <DicomCheck
          disabled={disabled}
          dicomLists={listsData}
          activeIndex={index}
        />
      </div>
    </div>
  );
};

export default DicomJsx;
