import { useState, useEffect, memo } from 'react';
import DicomRender from './dicomRender';

const DicomCheck = ({
  activeIndex,
  dicomLists,
  disabled,
}: {
  activeIndex: number;
  disabled: boolean;
  dicomLists: Array<{
    id: number;
    source_url: string;
    mm_per_pixel: number | string;
    markData: string | null;
  }>;
}) => {
  const [items, setItems] = useState<
    Array<{ id: number; source_url: string; mm_per_pixel: number }>
  >([]);
  useEffect(() => {
    setItems((prevState) => {
      if (dicomLists.length === 0) return [];
      prevState[activeIndex] = dicomLists[activeIndex];
      loadSuccess(activeIndex);
      return [...prevState];
    });
  }, [activeIndex, dicomLists]);

  const loadSuccess = (ind: number) => {
    setItems((prevState) => {
      // 每次自动加载加3个
      if (ind < dicomLists.length) {
        prevState[ind] = dicomLists[ind];
      }
      if (ind + 1 < dicomLists.length) {
        prevState[ind + 1] = dicomLists[ind + 1];
      }
      if (ind + 2 < dicomLists.length) {
        prevState[ind + 2] = dicomLists[ind + 2];
      }
      return [...prevState];
    });
  };

  return (
    <>
      {items.map((item, index) => (
        <div
          key={index}
          className={
              Number(activeIndex) === index
                ? 'actived renderItem'
                : 'default renderItem'
            }
        >
          <DicomRender
            markData={item?.markData}
            id={item?.id}
            isShow={Number(activeIndex) === index}
            loadSuccess={loadSuccess}
            index={index}
            ext="mp4"
            disabled={disabled}
            url={item?.source_url || ''}
            devicePixelRatio={item?.mm_per_pixel || 0}
          />
        </div>
      ))}
    </>
  );
};

export default memo(DicomCheck);
