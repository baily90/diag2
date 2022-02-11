import { FunctionComponent } from 'react';
import SearchBar from './components/SearchBar';
import DataList from './components/DataList';
import './index.less';

interface HistoryReportProps {

}

const HistoryReport: FunctionComponent<HistoryReportProps> = () => (
  <div className="historyReport-container">
    <div className="historyReport-search">
      <SearchBar />
    </div>
    <DataList />
  </div>
);

export default HistoryReport;
