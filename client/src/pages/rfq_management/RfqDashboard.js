import React, { useState } from 'react';
import { Tabs, Tab, Box, Paper, Typography } from '@mui/material';
import OpenRfqs from '../../pages/rfq_management/rfq_dashboard/OpenRfqs'; 
import PostRfqs from '../../pages/rfq_management/rfq_dashboard/PostRfqs';
import OnHoldRfqs from '../../pages/rfq_management/rfq_dashboard/OnHoldRfqs';
import ClosedRfqs from '../../pages/rfq_management/rfq_dashboard/ClosedRfqs';
import AddRfq from '../rfq_management/rfq_dashboard/AddRfq';
import Widgets from '../rfq_management/rfq_dashboard/rfq_widgets';
import { APILinkRoutes } from '../../components/apiLinks/APILinkRoutes';
import usefetchCustomAPIData from "../../components/hooks/fetchCustomAPI";
import { TbReceiptRupee } from "react-icons/tb";

const RfqDashboard = () => {
  const { data } = usefetchCustomAPIData(APILinkRoutes.summaryRoute);

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const renderTabContent = () => {
    switch (tabIndex) {
      case 0:
        return <OpenRfqs />;
      case 1:
        return <PostRfqs />;
      case 2:
        return <OnHoldRfqs />;
      case 3:
        return <ClosedRfqs />;
      case 4:
        return <AddRfq />;
      default:
        return null;
    }
  };

  return (
    <>
      <Typography variant='h5' className='headTxt'>RFQ Dashboard</Typography>

      <div className='row'>
        <Widgets span={true} color={["rgb(0 130 217)","#0070bb"]} icon={<TbReceiptRupee />} 
          title={['Open RFQs']} value={data?.rfq_summary_details?.open_rfqs_total.toLocaleString()} count={data?.rfq_summary_details?.open_rfqs} /> 
        <Widgets span={true} color={["rgb(0 130 217)","#0070bb"]} icon={<TbReceiptRupee />} 
          title={['Post Evaluation RFQs']} value={data?.rfq_summary_details?.post_rfqs_total.toLocaleString()} count={data?.rfq_summary_details?.post_rfqs} />
        <Widgets span={true} color={["rgb(0 130 217)","#0070bb"]} icon={<TbReceiptRupee />} 
          title={['On Hold RFQs']} value={data?.rfq_summary_details?.onhold_rfqs_total.toLocaleString()} count={data?.rfq_summary_details?.onhold_rfqs} />
        <Widgets span={true} color={["rgb(0 130 217)","#0070bb"]} icon={<TbReceiptRupee />} 
          title={['Cancelled RFQs']} value={data?.rfq_summary_details?.closed_rfqs_total.toLocaleString()} count={data?.rfq_summary_details?.closed_rfqs} />
      </div>

      <Paper style={{ padding: 15 }}>
        <Box>
          <Tabs value={tabIndex} onChange={handleTabChange} aria-label="RFQ tabs">
            <Tab label="Open RFQs" />
            <Tab label="Post Evaluation RFQs" />
            <Tab label="On Hold RFQs" />
            <Tab label="Closed/Cancelled RFQs" />
            <Tab label="Add RFQs" />
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
