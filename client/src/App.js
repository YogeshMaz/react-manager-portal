// src/App.js
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import '../src/App.css';
import Sidebar from './components/Sidebar';
import Header from './components/header';
/** RFQ Management */
import CustomerRfqs from './pages/rfq_management/CustomerRfqs';
import RfqDashboard from './pages/rfq_management/RfqDashboard';
import PartnerRFQs from './pages/rfq_management/PartnerRfqResponse';
/** Project Management */
import ProjectDashboard from './pages/project_management/ProjectDashboard';
import UpcomingDeliveries from './pages/project_management/UpcomingDeliveries';
import QualityCheck from './pages/project_management/QualityCheck';
import ProjectDetailPrint from './pages/project_management/project_dashboard/project_indetailed/ProjectInformation';
/** Purchase */
import VendorPos from './pages/purchase/VendorPos';
import VendorInvoices from './pages/purchase/VendorInvoices';
import RequestViewPayments from './pages/purchase/RequestViewPayments';
/** Drawing */
import AddDrawings from './pages/drawings/AddDrawings';
import ViewDrawings from './pages/drawings/ViewDrawings';
/** Assets */
import AddAssets from './pages/assets/AddAssets';
import ViewAssets from './pages/assets/ViewAssets';
import AssestUtilisation from './pages/assets/AssestUtilisation';
/** Visits */
import AddVisits from './pages/visits/AddVisits';
import ViewVisits from './pages/visits/ViewVisits';
/** ChatBot */
// import Chatbot from './components/chatbot/SalesIQ';

// import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
// import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from './components/ThemeContext'; // Import the useTheme hook
// import Logo from './components/Logo';
// import UserInfo from './components/hooks/fetchApiDetails';
import DashboardBox from '../src/pages/Dashboard/Dashboard'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap";
import { createContext, useEffect } from 'react';
import { useState } from 'react';

const MyContext = createContext();

function App() {
  const { toggleTheme, theme } = useTheme(); // Get the toggleTheme function and theme

  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const values = {
    isToggleSidebar,
    setIsToggleSidebar
  }

  useEffect(()=>{
    // alert(isToggleSidebar)
  },[isToggleSidebar])


  return (
    <>
    <MyContext.Provider value={values}>
      <Header/>
      <div className='main d-flex'>
        <div className={`sidebarWrapper ${isToggleSidebar === true ? 'toggle' : ''}`}>
          <Sidebar/>
        </div>
        <div className={`content ${isToggleSidebar === true ? 'toggle' : ''}`}>
          <Routes>
            <Route index element={<DashboardBox />} /> 
            {/* RFQ Management */}
            <Route path="/customer-rfqs" element={<CustomerRfqs />} />
            <Route path="/rfq-dashboard" element={<RfqDashboard />} />
            <Route path="/partner-rfq-response" element={<PartnerRFQs />} />
            {/* Project Management */}
            <Route path="/project-dashboard" element={<ProjectDashboard />} />
            <Route path="/upcoming-deliveries" element={<UpcomingDeliveries />} />
            <Route path="/quality-check" element={<QualityCheck />} />
            <Route path="/project-information" element={<ProjectDetailPrint />} />
            {/* Purchase */}
            <Route path="/vendor-pos" element={<VendorPos />} />
            <Route path="/vendor-invoices" element={<VendorInvoices />} />
            <Route path="/view-payments" element={<RequestViewPayments />} />
            {/* Drawings */}
            <Route path="/add-drawing" element={<AddDrawings />} />
            <Route path="/view-drawings" element={<ViewDrawings />} />
            {/* Assets */}
            <Route path="/add-assets" element={<AddAssets />} />
            <Route path="/view-assets" element={<ViewAssets />} />
            <Route path="/asset-utilisation" element={<AssestUtilisation />} />
            {/* Visits */}
            <Route path="/add-visits" element={<AddVisits />} />
            <Route path="/view-visits" element={<ViewVisits />} />
          </Routes>
        </div>
        {/* <div>
          <Chatbot />
        </div> */}
      </div>
    </MyContext.Provider>

      {/* <Box
        component="main"
        sx={{ flexGrow: 1, p: 1, marginTop: 6, width: 100 }}
      >
        <Routes>
          <Route path="/" element={<Typography paragraph>Welcome to the Manager Portal! <DashboardBox /> </Typography>} />
          <Route path="/customer-rfqs" element={<CustomerRfqs />} />
          <Route path="/rfq-dashboard" element={<RfqDashboard />} />
          <Route path="/partner-rfq-response" element={<PartnerRFQs />} />
          <Route path="/project-dashboard" element={<ProjectDashboard />} />
          {/* Add more routes as needed 
        </Routes>
      </Box> */}
  </>
  );
}

export default App;
export {MyContext}

