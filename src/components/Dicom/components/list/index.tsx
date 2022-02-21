import {
  Row, Col, Checkbox, message,
} from 'antd';
import { CaretRightFilled } from '@ant-design/icons';
import { useCheckImageContext } from '../../context/checkImageProvider';

const DicomsList = ({
  dicomLists,
  getDicomById,
  actived,
}: {
  actived: number;
  dicomLists: Array<{
    id: number;
    isScreenShot?: boolean;
    source_url: string;
    mm_per_pixel?: number;
    source_type: number;
    littleImg: string;
    position_desc: string;
  }>;
  getDicomById: (e: number) => void;
}) => {
  const { setCheckImages, checkImages } = useCheckImageContext();
  const switchDicom = (id: number) => {
    getDicomById(id);
  };
  const onChange = (e: any) => {
    console.log(e);

    if (e.length > 4) {
      message.info('报告中不能超过4张图片发送给患者');
    } else {
      setCheckImages(e);
    }
  };
  return (
    <Checkbox.Group onChange={onChange} value={checkImages}>
      <Row gutter={[10, 10]}>
        {dicomLists.map((item) => (
          <Col
            key={item.id}
            span={12}
            onClick={switchDicom.bind(null, item.id)}
          >
            <div className={item.id === actived ? 'activedSpan big' : 'big'}>
              <div className="select-box">
                {item.isScreenShot && <Checkbox value={item} />}
              </div>
              {item.source_type === 2 ? (
                <CaretRightFilled className="iconSize" />
              ) : (
                ''
              )}
              <img src={item.littleImg} alt="" />
              {item.position_desc && (
              <div className="position">{item.position_desc}</div>
              )}
            </div>
          </Col>
        ))}
      </Row>
    </Checkbox.Group>
  );
};

export default DicomsList;
