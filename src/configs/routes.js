import React from 'react';

const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const DailyRevenue = React.lazy(() => import('../pages/DailyRevenue'));
const MothlyRevenue = React.lazy(() => import('../pages/MonthlyRevenue'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/daily-revenue', exact: true, name: 'Daily Revenue', component: DailyRevenue },
  { path: '/monthly-revenue', exact: true, name: 'Mothly Revenue', component: MothlyRevenue },
];

export default routes;
