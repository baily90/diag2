import { Modal } from 'antd';
import { FunctionComponent, ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useCheckImageContext } from '../Dicom/context/checkImageProvider';
import {
  thyList,
  carFilmList,
  liverCouList,
  BreastCouList,
  mesareicList,
} from '@/constants/selectOptions';
import {
  thyroidHealthInfo,
  carotidArteryHealthInfo,
  commonSuggestList,
  LiverCourageHealthInfo,
  BreastHealthInfo,
  mesareicHealthInfo,
} from '@/constants/healthInfo';
import ThyTempletePreview from './components/ThyTempletePreview';
import CaroTidTempletePreview from './components/CaroTidTempletePreview';
import LiverCourageTempletePreview from './components/LiverCourageTempletePreview';
import OtherLiverCou from './components/LiverCourageTempletePreview/OtherLiverCou';
import BreastTempletePreview from './components/BreastTempletePreview';
import { RootState } from '@/store';
import './index.less';
import { GenderEnum } from '@/types/patient';

interface PreviewReportModalProps {
  isModalVisible: boolean,
  handleOk: () => void,
  handleCancel: () => void,
  formValue: any
}

const PreviewReportModal: FunctionComponent<PreviewReportModalProps> = ({
  isModalVisible,
  handleOk,
  handleCancel,
  formValue = {},
}) => {
  console.log('PreviewReportModal');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { checkImages } = useCheckImageContext();
  const {
    body_region_id: type,
    signImg,
    patient,
  } = useSelector((state: RootState) => state.report);

  const getPatientInfos = () => {
    const {
      name, gender, age, age_unit, product_name, create_time,
    } = patient;
    const patientInfos = [
      {
        name: '患者名字：',
        value: name,
      },
      {
        name: '性别：',
        value: GenderEnum[gender],
      },
      {
        name: '年龄：',
        value: `${age}${age_unit === 0
          ? '岁'
          : age_unit === 1
            ? '月'
            : age_unit === 2
              ? '天'
              : ''
        }`,
      },
      {
        name: '检查部位：',
        value: product_name,
      },
      {
        name: '检查时间：',
        value: moment(create_time * 1000).format('YYYY-MM-DD HH:mm:ss'),
      },
    ];
    return patientInfos;
  };
  // 渲染用户信息
  const renderUserInfo = () => {
    const infos: any = getPatientInfos();
    return infos.map((item: any, index: any) => (
      <div className="info-item" key={index}>
        <div className="item-details">
          {item.name}
          {item.value}
        </div>
      </div>
    ));
  };

  // 渲染健康建议和超声提示
  const renderContentList = () => (
    <>
      <div className="report-tips" key="超声提示">
        <div className="tips-label table-label">超声提示：</div>
        <span className="tips-test">
          {' '}
          {renderCSTS()}
          {' '}
        </span>
      </div>
      <div className="report-tips" key="健康建议">
        <div className="tips-label table-label">健康建议：</div>
        <span className="tips-test">
          {' '}
          {renderJKJY()}
          {' '}
        </span>
      </div>
    </>
  );
  /**
   * 渲染超声提示
   * @returns
   */
  const renderCSTS = () => {
    const { cs_tip_des, cs_tips, csts } = formValue;
    let content = '';
    if (type === 4 || type === 5) {
      content += `注：${csts}`;
    } else {
      cs_tips.map((item: any) => {
        if (content) {
          content += '； \t';
        }
        content += getCSTSTextById(item);
      });
      if (cs_tip_des) {
        if (content) {
          content += '； \t';
        }
        content += cs_tip_des;
      }
    }

    return content;
  };

  /**
   * 根据选择的超声提示id获取对应文案
   * @param id
   * @returns
   */
  const getCSTSTextById = (id: string): any => {
    let list = [];
    switch (type) {
      case 1:
        list = thyList;
        break;
      case 2:
        list = carFilmList;
        break;
      case 3:
        list = liverCouList;
        break;
      case 6:
        list = BreastCouList;
        break;
      case 7:
        list = mesareicList;
        break;
      default:
        list = [];
    }

    return list.find((item) => item.value?.includes(id))?.txt;
  };

  /**
   * 渲染健康建议
   * @returns
   */
  const renderJKJY = () => {
    const { health_proposal, health_proposal_des } = formValue;
    let content = '';
    const { label, desc } = getJKJYTextByValue(health_proposal);
    content += `${label}\n`;
    if (type === 4 || type === 5) {
      content += `注：${health_proposal_des}`;
    } else {
      content += `建议：${desc}\n`;
      if (health_proposal_des) {
        content += `${health_proposal_des}\n`;
      }
    }
    return content;
  };

  /**
   * 根据选择的健康建议value获取对应文案
   * @param value
   * @returns
   */
  const getJKJYTextByValue = (value: number): any => {
    let list = [];
    switch (type) {
      case 1:
        list = thyroidHealthInfo;
        break;
      case 2:
        list = carotidArteryHealthInfo;
        break;
      case 3:
        list = LiverCourageHealthInfo;
        break;
      case 4:
      case 5:
        list = commonSuggestList;
        break;
      case 6:
        list = BreastHealthInfo;
        break;
      case 7:
        list = mesareicHealthInfo;
        break;
      default:
        list = [];
    }
    return list.find((item) => item.value === value);
  };

  // 渲染媒体文件
  const renderMedia = () => checkImages.map((item: any, index: number) => (
    <div className="media  flex-center" key={index}>
      <img src={item.littleImg} alt="" />
    </div>
  ));

  const renderTable = (): ReactNode => {
    const { cssj } = formValue;
    switch (type) {
      case 1:
        return <ThyTempletePreview templateData={formValue} />;
      case 2:
        return <CaroTidTempletePreview templateData={formValue} />;
      case 3:
        return <LiverCourageTempletePreview templateData={formValue} />;
      case 4:
      case 5:
        return (
          <>
            注：
            {cssj}
          </>
        );
      case 6:
        return <BreastTempletePreview templateData={formValue} />;
      case 7:
        return { cssj };
      default:
        return '';
    }
  };

  return (
    <Modal
      width="80%"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="发送报告"
      cancelText="返回编辑"
      destroyOnClose
    >
      <div className="preview-report-body">
        <div className="report-title">
          <div className="report-hospital flex-justify">
            明医众禾（青岛）互联网医院
          </div>
          <div className="report-type  flex-justify">超声检查报告单</div>
        </div>
        <div className="report-user">
          {/* 线 */}
          <div className="report-line" />
          {/* 信息 */}
          <div className="report-details flex-item-wrap ">
            {renderUserInfo()}
          </div>
          <div className="report-line" />
        </div>

        {formValue && (
          <div className="report-content">
            <div className="report-media flex-item-wrap">{renderMedia()}</div>
            <div className="report-table">
              <div className="table-label">
                {type !== 3 ? '超声所见：' : '肝脏超声所见：'}
              </div>
              {renderTable()}
            </div>
            {type === 3 && (
              <div className="report-table">
                <div className="table-label">胆囊超声所见：</div>
                <OtherLiverCou templateData={formValue} />
              </div>
            )}

            <div className="report-list">{renderContentList()}</div>
          </div>
        )}
        <div className="report-line" />
        {/* 签名医生 */}
        <div className="report-signature-doctor">
          <div className="doctor-details">
            签名医生:
            <span className="doctor-name">
              <img src={signImg} alt="" />
            </span>
          </div>
          <div className="flex-space-between">
            <div className="">
              报告发送时间：
              {moment().format('YYYY-MM-DD HH:mm:ss')}
            </div>
            <div className="">
              特别提示：本次超声检查仅供临床参考，不做证明材料
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PreviewReportModal;
