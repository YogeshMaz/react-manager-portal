import React, { createContext, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; // Added useLocation
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
/*Login*/
import Login from './pages/login/Login_page';
import DashboardBox from '../src/pages/Dashboard/Dashboard';
import { useTheme } from './components/ThemeContext'; // Import the useTheme hook

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap";
import Login_page from './pages/login/Login_page';

const MyContext = createContext();

function App() {
  const { toggleTheme, theme } = useTheme(); // Get the toggleTheme function and theme
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
  };

  const location = useLocation(); // Get the current route
  // Determine if we are on the login page
  const isLoginPage = location.pathname === "/Login";

  useEffect(() => {
    // Add or remove class based on isLoginPage
    if (isLoginPage) {
      document.body.classList.add("bgColor");
    } else {
      document.body.classList.remove("bgColor");
    }
    
    // Cleanup function to remove class if component unmounts
    return () => {
      document.body.classList.remove("bgColor");
    };
  }, [isLoginPage]); // Re-run this effect whenever isLoginPage changes


  return (
    <MyContext.Provider value={values}>
      {!isLoginPage && <Header />}
      <div className={isLoginPage ? "mainLogin" : "main d-flex"}>
        {!isLoginPage && (
          <div className={`sidebarWrapper ${isToggleSidebar ? 'toggle' : ''}`}>
            <Sidebar />
          </div>
        )}
        <div className={isLoginPage ? "contentLogin" : `content ${isToggleSidebar ? 'toggle' : ''}`}>
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
            {/* Login */}
            <Route path="/Login" element={<Login_page />} />
          </Routes>
        </div>
      </div>
    </MyContext.Provider>
  );
}

export default App;
export { MyContext };
