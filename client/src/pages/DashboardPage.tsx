import React from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { LeadsTable } from '../components/leads/LeadsTable';

const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout>
      <LeadsTable />
    </DashboardLayout>
  );
};

export default DashboardPage;
