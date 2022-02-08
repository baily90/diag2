import { Spin } from 'antd';
import { FunctionComponent, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';

interface AppProps {

}

const App: FunctionComponent<AppProps> = () => {
  const element = useRoutes(routes);
  return (
    <Suspense fallback={<Spin />}>
      {element}
    </Suspense>
  );
};

export default App;
