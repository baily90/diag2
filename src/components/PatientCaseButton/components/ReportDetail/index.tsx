import { FunctionComponent } from 'react';
import { Card, Divider } from 'antd';
import './index.less';

interface ReportDetailProps {
  age: number;
  gender: number;
  reportDate: string;
  bodyRegionText: string;
  sources: Array<{ source_type: number; source_url: string }>;
  htmlText: string;
}

const ReportDetail: FunctionComponent<ReportDetailProps> = ({
  age,
  gender,
  reportDate,
  bodyRegionText,
  sources,
  htmlText,
}) => (
  <>
    <Card className="detailWrap" bordered={false}>
      <div className="patientInfo">
        <span>
          检查时间:
          {reportDate}
        </span>
        <span>
          检查项目:
          {bodyRegionText}
        </span>
        <span>
          性别:
          {gender === 1 ? '男' : '女'}
        </span>
        <span>
          年龄:
          {!!age && `${age}岁`}
        </span>
      </div>
      <div className="sourceInfo">
        {sources?.map(
          (item) => item.source_type === 1
              && item.source_url && <img className="img" src={item.source_url} alt="" />,
        )}
      </div>
      <div dangerouslySetInnerHTML={{ __html: htmlText }} />
    </Card>
    <Divider dashed style={{ borderColor: '#3D3D3D', margin: 0 }} />
  </>
);

export default ReportDetail;
