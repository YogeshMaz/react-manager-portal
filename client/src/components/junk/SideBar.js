import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Collapse } from '@mui/material';
import { Home, Settings, Logout, ManageAccounts, ExpandLess, ExpandMore } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../components/Logo';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRFQDropdownOpen, setIsRFQDropdownOpen] = useState(false);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [isPurchaseDropdownOpen, setIsPurchaseDropdownOpen] = useState(false);
  const [isDrawingVersionDropdownOpen, setIsDrawingVersionDropdownOpen] = useState(false);
  const [isAssetDropdownOpen, setIsAssetDropdownOpen] = useState(false);
  const [isVisitDropdownOpen, setIsVisitDropdownOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const toggleRFQDropdown = () => {
    setIsRFQDropdownOpen(!isRFQDropdownOpen);
  };

  const toggleProjectDropdown = () => {
    setIsProjectDropdownOpen(!isProjectDropdownOpen);
  };

  const togglePurchaseDropdown = () => {
    setIsPurchaseDropdownOpen(!isPurchaseDropdownOpen);
  };

  const toggleDrawingVersionDropdown = () => {
    setIsDrawingVersionDropdownOpen(!isDrawingVersionDropdownOpen);
  }

  const toggleAssetDropdown = () => {
    setIsAssetDropdownOpen(!isAssetDropdownOpen);
  }

  const toggleVisitDropdown = () => {
    setIsVisitDropdownOpen(!isVisitDropdownOpen);
  }

  return (
    <>
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer}>
        <Logo />
        <List>
          {/* RFQ Management Dropdown */}
          <ListItem button onClick={toggleRFQDropdown}>
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary="RFQ Management" />
            {isRFQDropdownOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={isRFQDropdownOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }}>
                <ListItemText primary="Customer RFQs" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }}>
                <ListItemText primary="RFQ Dashboard" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }}>
                <ListItemText primary="Partner RFQ Response" />
              </ListItem>
            </List>
          </Collapse>

          {/* Project Management Dropdown */}
          <ListItem button onClick={toggleProjectDropdown}>
            <ListItemIcon><ManageAccounts /></ListItemIcon>
            <ListItemText primary="Project Management" />
            {isProjectDropdownOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={isProjectDropdownOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }}>
                <ListItemText primary="Project Dashboard" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }}>
                <ListItemText primary="Upcoming Deliveries" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }}>
                <ListItemText primary="Quality Check" />
              </ListItem>
            </List>
          </Collapse>

            {/* Purchase Dropdown */}
            <ListItem button onClick={togglePurchaseDropdown}>
            <ListItemIcon><ManageAccounts /></ListItemIcon>
            <ListItemText primary="Purchase" />
            {isPurchaseDropdownOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={isPurchaseDropdownOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }}>
                <ListItemText primary="Vendor POs" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }}>
                <ListItemText primary="Vendor Invoices" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }}>
                <ListItemText primary="Request/View Payments" />
              </ListItem>
            </List>
          </Collapse>

            {/* Drawing Version Dropdown */}
            <ListItem button onClick={toggleDrawingVersionDropdown}>
            <ListItemIcon><ManageAccounts /></ListItemIcon>
            <ListItemText primary="Drawing Version" />
            {isDrawingVersionDropdownOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={isDrawingVersionDropdownOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }}>
                <ListItemText primary="Add Drawing" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }}>
                <ListItemText primary="View Drawings" />
              </ListItem>
            </List>
          </Collapse>

            {/* Assets Dropdown */}
            <ListItem button onClick={toggleAssetDropdown}>
            <ListItemIcon><ManageAccounts /></ListItemIcon>
            <ListItemText primary="Assets" />
            {isAssetDropdownOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={isAssetDropdownOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }}>
                <ListItemText primary="Add Assets" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }}>
                <ListItemText primary="View Assets" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }}>
                <ListItemText primary="Asset Utilisation" />
              </ListItem>
            </List>
          </Collapse>

            {/* Visits Dropdown */}
            <ListItem button onClick={toggleVisitDropdown}>
            <ListItemIcon><ManageAccounts /></ListItemIcon>
            <ListItemText primary="Visits" />
            {isVisitDropdownOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={isVisitDropdownOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }}>
                <ListItemText primary="Add Visits" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }}>
                <ListItemText primary="View Visits" />
              </ListItem>
            </List>
          </Collapse>

          {/* Settings and Logout */}
          <ListItem button>
            <ListItemIcon><Settings /></ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><Logout /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
