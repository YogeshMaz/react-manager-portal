import React, { createContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
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

/** Analytics */
import Analytics from './pages/analytics/Analytics'

/** Profile */
import Profile from './pages/login/profile';

/*Login*/
import LoginPage from './pages/Authentication/Login';
import DashboardBox from '../src/pages/Dashboard/Dashboard';
import { useTheme } from './components/ThemeContext';
import { useAuth } from './pages/Authentication/AuthContext'; // Assuming you have an AuthContext for authentication
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap";


const MyContext = createContext();

function App() {
  const { toggleTheme, theme } = useTheme();
  const { isAuthenticated } = useAuth(); // Get authentication state from context
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
  };

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  useEffect(() => {
    if (isLoginPage) {
      document.body.classList.add("bgColor");
    } else {
      document.body.classList.remove("bgColor");
    }

    return () => {
      document.body.classList.remove("bgColor");
    };
  }, [isLoginPage]);

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
            {/* Root route - maintain the current path */}
            <Route 
              path="/" 
              element={isAuthenticated ? <Navigate to={location.pathname} /> : <Navigate to="/login" />} 
            />
            {/* Dashboard and other routes maintain current path */}
            <Route path="/dashboard" element={isAuthenticated ? <DashboardBox /> : <Navigate to={location.pathname} />} />
            
            {/* RFQ Management */}
            <Route path="/customer-rfqs" element={isAuthenticated ? <CustomerRfqs /> : <Navigate to="/login" />} />
            <Route path="/rfq-dashboard" element={isAuthenticated ? <RfqDashboard /> : <Navigate to={location.pathname} />} />
            <Route path="/partner-rfq-response" element={isAuthenticated ? <PartnerRFQs /> : <Navigate to={location.pathname} />} />
            
            {/* Project Management */}
            <Route path="/project-dashboard" element={isAuthenticated ? <ProjectDashboard /> : <Navigate to={location.pathname} />} />
            <Route path="/upcoming-deliveries" element={isAuthenticated ? <UpcomingDeliveries /> : <Navigate to={location.pathname} />} />
            <Route path="/quality-check" element={isAuthenticated ? <QualityCheck /> : <Navigate to={location.pathname} />} />
            
            {/* Purchase */}
            <Route path="/vendor-pos" element={isAuthenticated ? <VendorPos /> : <Navigate to={location.pathname} />} />
            <Route path="/vendor-invoices" element={isAuthenticated ? <VendorInvoices /> : <Navigate to={location.pathname} />} />
            <Route path="/view-payments" element={isAuthenticated ? <RequestViewPayments /> : <Navigate to={location.pathname} />} />
            
            {/* Drawings */}
            <Route path="/add-drawing" element={isAuthenticated ? <AddDrawings /> : <Navigate to={location.pathname} />} />
            <Route path="/view-drawings" element={isAuthenticated ? <ViewDrawings /> : <Navigate to={location.pathname} />} />
            
            {/* Assets */}
            <Route path="/add-assets" element={isAuthenticated ? <AddAssets /> : <Navigate to={location.pathname} />} />
            <Route path="/view-assets" element={isAuthenticated ? <ViewAssets /> : <Navigate to={location.pathname} />} />
            <Route path="/asset-utilisation" element={isAuthenticated ? <AssestUtilisation /> : <Navigate to={location.pathname} />} />
            
            {/* Visits */}
            <Route path="/add-visits" element={isAuthenticated ? <AddVisits /> : <Navigate to={location.pathname} />} />
            <Route path="/view-visits" element={isAuthenticated ? <ViewVisits /> : <Navigate to={location.pathname} />} />

            {/* Analytics */}
            <Route path="/analytics" element={isAuthenticated ? <Analytics /> : <Navigate to={location.pathname} />} />

            {/* Profile */}
            <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to={location.pathname} />} />
            
            {/* Login */}
            <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </div>
    </MyContext.Provider>
  );
}

export default App;
export { MyContext };
