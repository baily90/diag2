import { Modal } from 'antd';
import moment from 'moment';
import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { GenderEnum } from '@/types/patient';
import { useCheckImageContext } from '@/components/Dicom/context/checkImageProvider';

interface PreviewProps {
  isModalVisible: boolean,
  handleOk: () => void,
  handleCancel: () => void,
  previewData: any,
  confirmLoading: boolean
}

const Preview: FunctionComponent<PreviewProps> = ({
  isModalVisible,
  handleOk,
  handleCancel,
  previewData = {},
  confirmLoading,
}) => {
  console.log('Preview');
  const { checkImages } = useCheckImageContext();
  const {
    body_region_id,
    signImg,
    patient,
    reportConf,
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

  // 渲染媒体文件
  const renderMedia = () => checkImages.map((item: any, index: number) => (
    <div className="media  flex-center" key={index}>
      <img src={item.littleImg} alt="" />
    </div>
  ));

  // 渲染超声提示
  const renderCSTS = () => {
    if (!previewData) return '';
    const { csts } = previewData;
    let content = '';
    csts?.forEach((item) => {
      if (content) {
        content += '; ';
      }
      content += item?.content?.join('');
    });
    return content;
  };

  // 渲染健康建议
  const renderJKJY = () => {
    if (!previewData) return '';
    const healthRemind = previewData?.healthRemind;
    const id = healthRemind?.id;
    const remark = healthRemind?.remark;
    const healthRemindOptions = reportConf?.healthRemind;
    const obj = healthRemindOptions?.filter((item) => item.id === id)?.[0];
    let content = `${obj?.levelName}\n${obj?.content}`;
    if (remark) {
      content += `\n${remark}`;
    }
    return content;
  };

  // 渲染超声所见
  const renderCSSJ = () => {
    if (!previewData) return '';
    const { cssj } = previewData;
    const content = (
      <>
        <div className="line">
          <ul>
            {cssj?.map((item) => (
              <li key={item.id}>{item?.name}</li>
            ))}
          </ul>
        </div>
        <div className="line">
          <ul>
            {cssj?.map((item) => (
              <li key={item.id}>{item?.content}</li>
            ))}
          </ul>
        </div>
      </>
    );

    return content;
  };

  return (
    <Modal
      width={850}
      confirmLoading={confirmLoading}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="发送报告"
      cancelText="返回编辑"
      maskClosable={false}
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
          <div className="report-line" />
          <div className="report-details flex-item-wrap ">
            {renderUserInfo()}
          </div>
          <div className="report-line" />
        </div>

        {previewData && (
          <div className="report-content">
            <div className="report-media flex-item-wrap">{renderMedia()}</div>
            <div className="report-table">
              <div className="table-label">超声所见</div>
              {renderCSSJ()}
            </div>
            <div className="report-list">
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
                  {renderJKJY()}
                </span>
              </div>
            </div>
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

export default Preview;
