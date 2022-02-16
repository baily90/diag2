import {
  Button, Modal, Tabs, Image,
} from 'antd';
import { BaseButtonProps } from 'antd/lib/button/button';
import { FunctionComponent, useState } from 'react';
import config from './config';
import './index.less';

const ReportRuleButton: FunctionComponent<BaseButtonProps> = ({
  ...props
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button {...props} onClick={showModal}>报告出具规则</Button>
      <Modal
        width={800}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
        footer={[
          <Button onClick={handleOk}>
            我知道了
          </Button>,
        ]}
      >
        <div className="reportRule-container">
          <Tabs defaultActiveKey="1">
            {
              config?.map((item) => (
                <Tabs.TabPane tab={item.tabName} key={item.tabKey}>
                  <div className="title">报告标准</div>
                  {
                    item?.standards?.map((ite) => (
                      <div className="standard-row" key={ite.key}>
                        {ite?.values?.map((it) => (
                          <div className="standard-col" key={it}>{it}</div>
                        ))}
                      </div>
                    ))
                  }
                  {
                    !!item?.templates?.length && (
                      <>
                        <div className="title">模板参考</div>
                        <Tabs tabPosition="left" defaultActiveKey="1">
                          {
                            item?.templates?.map((ite) => (
                              <Tabs.TabPane tab={ite.tabName} key={ite.tabKey}>
                                <Image
                                  preview={false}
                                  height={700}
                                  src={ite.templateImg}
                                />
                              </Tabs.TabPane>
                            ))
                          }
                        </Tabs>
                      </>
                    )
                  }
                </Tabs.TabPane>
              ))
            }
          </Tabs>
        </div>
      </Modal>
    </>
  );
};

export default ReportRuleButton;
