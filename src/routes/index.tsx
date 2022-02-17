import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import AuthLayout from '@/layouts/AuthLayout';
import UserLayout from '@/layouts/UserLayout';
import BasicLayout from '@/layouts/BasicLayout';
import ReportLayout from '@/layouts/ReportLayout';
import HistoryReportDetails from '@/pages/HistoryReportDetails';

const Home = lazy(() => import('@/pages/Home'));
const EditReport = lazy(() => import('@/pages/EditReport'));
const HistoryReport = lazy(() => import('@/pages/HistoryReport'));

const Login = lazy(() => import('@/pages/Login'));
const ResetPassword = lazy(() => import('@/pages/ResetPassword'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '',
        element: <BasicLayout />,
        children: [
          { index: true, element: <Home /> },
          {
            path: '/historyReport',
            element: <HistoryReport />,
          },
        ],
      },
      {
        path: '',
        element: <ReportLayout />,
        children: [
          {
            path: '/editReport/:id',
            element: <EditReport />,
          },
          {
            path: '/historyReportDetails/:id',
            element: <HistoryReportDetails />,
          },
        ],
      },
    ],
  },
  {
    path: '/user',
    element: <UserLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'resetPassword',
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
