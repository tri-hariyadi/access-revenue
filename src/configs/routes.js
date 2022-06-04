import React from 'react';

const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const DailyRevenue = React.lazy(() => import('../pages/DailyRevenue'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/daily-revenue', exact: true, name: 'Daily Revenue', component: DailyRevenue },
];

export default routes;
