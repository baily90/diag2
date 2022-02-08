import { Button } from 'antd';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {
  const navigate = useNavigate();
  const handleGo2EditReport = () => {
    navigate('/editReport/777888999');
  };
  return (
    <>
      <div>Home</div>
      <Button onClick={handleGo2EditReport}>去诊断</Button>
    </>
  );
};

export default Home;
