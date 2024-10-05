import React, { createContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/header';
import CustomerRfqs from './pages/rfq_management/CustomerRfqs';
import RfqDashboard from './pages/rfq_management/RfqDashboard';
import PartnerRFQs from './pages/rfq_management/PartnerRfqResponse';
import ProjectDashboard from './pages/project_management/ProjectDashboard';
import UpcomingDeliveries from './pages/project_management/UpcomingDeliveries';
import QualityCheck from './pages/project_management/QualityCheck';
import VendorPos from './pages/purchase/VendorPos';
import VendorInvoices from './pages/purchase/VendorInvoices';
import RequestViewPayments from './pages/purchase/RequestViewPayments';
import AddDrawings from './pages/drawings/AddDrawings';
import ViewDrawings from './pages/drawings/ViewDrawings';
import AddAssets from './pages/assets/AddAssets';
import ViewAssets from './pages/assets/ViewAssets';
import AssestUtilisation from './pages/assets/AssestUtilisation';
import AddVisits from './pages/visits/AddVisits';
import ViewVisits from './pages/visits/ViewVisits';
import Analytics from './pages/analytics/Analytics';
import Profile from './pages/login/profile';
import LoginPage from './pages/Authentication/Login';
import DashboardBox from './pages/Dashboard/Dashboard';
import { useTheme } from './components/ThemeContext';
import { useAuth } from './pages/Authentication/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';

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
  const isLoginPage = location.pathname === '/login';

  useEffect(() => {
    if (isLoginPage) {
      document.body.classList.add('bgColor');
    } else {
      document.body.classList.remove('bgColor');
    }

    return () => {
      document.body.classList.remove('bgColor');
    };
  }, [isLoginPage]);

  return (
    <MyContext.Provider value={values}>
      {!isLoginPage && <Header />}
      <div className={isLoginPage ? 'mainLogin' : 'main d-flex'}>
        {!isLoginPage && (
          <div className={`sidebarWrapper ${isToggleSidebar ? 'toggle' : ''}`}>
            <Sidebar />
          </div>
        )}
        <div className={isLoginPage ? 'contentLogin' : `content ${isToggleSidebar ? 'toggle' : ''}`}>
          <Routes>
            {/* Redirect to login if not authenticated */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            {/* Dashboard and other routes */}
            <Route path="/dashboard" element={isAuthenticated ? <DashboardBox /> : <Navigate to="/login" />} />
            <Route path="/customer-rfqs" element={isAuthenticated ? <CustomerRfqs /> : <Navigate to="/login" />} />
            <Route path="/rfq-dashboard" element={isAuthenticated ? <RfqDashboard /> : <Navigate to="/login" />} />
            <Route path="/partner-rfq-response" element={isAuthenticated ? <PartnerRFQs /> : <Navigate to="/login" />} />
            <Route path="/project-dashboard" element={isAuthenticated ? <ProjectDashboard /> : <Navigate to="/login" />} />
            <Route path="/upcoming-deliveries" element={isAuthenticated ? <UpcomingDeliveries /> : <Navigate to="/login" />} />
            <Route path="/quality-check" element={isAuthenticated ? <QualityCheck /> : <Navigate to="/login" />} />
            <Route path="/vendor-pos" element={isAuthenticated ? <VendorPos /> : <Navigate to="/login" />} />
            <Route path="/vendor-invoices" element={isAuthenticated ? <VendorInvoices /> : <Navigate to="/login" />} />
            <Route path="/view-payments" element={isAuthenticated ? <RequestViewPayments /> : <Navigate to="/login" />} />
            <Route path="/add-drawing" element={isAuthenticated ? <AddDrawings /> : <Navigate to="/login" />} />
            <Route path="/view-drawings" element={isAuthenticated ? <ViewDrawings /> : <Navigate to="/login" />} />
            <Route path="/add-assets" element={isAuthenticated ? <AddAssets /> : <Navigate to="/login" />} />
            <Route path="/view-assets" element={isAuthenticated ? <ViewAssets /> : <Navigate to="/login" />} />
            <Route path="/asset-utilisation" element={isAuthenticated ? <AssestUtilisation /> : <Navigate to="/login" />} />
            <Route path="/analytics" element={isAuthenticated ? <Analytics /> : <Navigate to="/login" />} />
            <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
            {/* Login route */}
            <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </div>
    </MyContext.Provider>
  );
}

export default App;
export { MyContext };
