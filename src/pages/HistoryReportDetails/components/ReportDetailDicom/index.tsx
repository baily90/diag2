import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import parseInt from 'lodash/parseInt';
// import DicomJsx from '@/components/Dicom';
import { RootState } from '@/store';
import { getMarkData } from '@/store/reducers/reportReducer';
import './index.less';

interface ReportDetailDicomProps {

}

const ReportDetailDicom: FunctionComponent<ReportDetailDicomProps> = () => {
  console.log('ReportDetailDicom');
  const dispatch = useDispatch();
  const { id } = useParams();
  const [sourceList, setSourceList] = useState<
    Array<{
      title: string;
      lists: Array<{
        source_url: string;
        mm_per_pixel?: number;
        source_type: number;
      }>;
    }>
  >([]);

  const { ai_source, sources, mark_data } = useSelector((state: RootState) => state.report);

  useEffect(() => {
    if (id) {
      dispatch(getMarkData(parseInt(id)));
    }
  }, []);

  useEffect(() => {
    const aiSourceAndMard = ai_source?.map(
      (item, index) => {
        const temp = JSON.parse(JSON.stringify(item));
        temp.markData = mark_data[index];
        return temp;
      },
    );
    const aiSource = {
      title: '其他扫查图片',
      lists: aiSourceAndMard,
    };
    const source = {
      title: '已选择图片',
      lists: sources,
    };
    setSourceList([source, aiSource]);
  }, [ai_source, sources, mark_data]);

  return (
    <>DicomJsx</>
    // <DicomJsx disabled dicomLists={sourceList} />
  );
};

export default ReportDetailDicom;
