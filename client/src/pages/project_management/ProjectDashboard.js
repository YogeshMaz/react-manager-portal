import React, { useState } from 'react';
import { Tabs, Tab, Box, Paper, Typography } from '@mui/material';
import OpenProjects from '../project_management/project_dashboard/OpenProjects'; 
import ProductionProjects from '../project_management/project_dashboard/ProductionProjects';
import OnHoldProjects from '../project_management/project_dashboard/OnHoldProjects';
import CancelledProjects from '../project_management/project_dashboard/CancelledProjects';
import ProjectDetailPrint from '../project_management/project_dashboard/project_indetailed/ProjectInformation';
import AddProject from './project_dashboard/AddProjects';

const RfqDashboard = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const renderTabContent = () => {
    switch (tabIndex) {
      case 0:
        return <OpenProjects />;
      case 1:
        return <ProductionProjects />;
      case 2:
        return <OnHoldProjects />;
      case 3:
        return <CancelledProjects />;
      case 4:
        return <AddProject />;
      default:
        return null;
    }
  };

  return (
    <>
      <style>
        {`
          .modelCls {
            position: absolute;
            padding: 10px;
            right: 0;
            z-index: 1;
          }
        `}
      </style>
      <div className="modal fade" id="projectDetailModal" tabIndex="-1" aria-labelledby="projectDetailModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <button type="button" className="btn-close modelCls" data-bs-dismiss="modal" aria-label="Close"></button>
            <div className="modal-body">
              <ProjectDetailPrint />
            </div>
          </div>
        </div>
      </div>
      <Typography variant='h5' className='headTxt'>Project Dashboard</Typography>
      <Paper style={{ padding: 15 }}>
        <Box>
          <Tabs value={tabIndex} onChange={handleTabChange} aria-label="RFQ tabs">
            <Tab label="Open Projects" />
            <Tab label="Production Projects" />
            <Tab label="On Hold Projects" />
            <Tab label="Cancelled Projects" />
            <Tab label="Add New Projects" />
          </Tabs>
        </Box>
        <Box mt={1}>
          {/* Render tab content directly without loading state */}
          {renderTabContent()}
        </Box>
      </Paper>
    </>
  );
};

export default RfqDashboard;
