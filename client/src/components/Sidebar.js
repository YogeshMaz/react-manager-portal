import React, { useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom"; // Import useLocation hook
import {
  MdOutlineRequestQuote,
  MdWorkOutline,
  MdOutlineShoppingCart,
  MdOutlineDescription,
  MdOutlineInventory,
  MdOutlineEvent,
  MdOutlineSettings,
  MdOutlineExitToApp,
  MdOutlineAssignment,
  MdOutlineHighQuality,
  MdOutlineReceiptLong,
  MdOutlineSpaceDashboard,
  MdWebAsset,
  MdOutlinePreview,
  MdOutlineGroup,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { BiPurchaseTag } from "react-icons/bi";
import { RxDrawingPin } from "react-icons/rx";
import { FiPlusSquare } from "react-icons/fi";

import { MyContext } from "../App";

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation(); // Get the current route
  const context = useContext(MyContext);

  useEffect(() => {
    // Open dropdown if any submenu item in it is active
    const currentPath = location.pathname;
    const activeDropdown = menuItems.find((item) =>
      item.items.some((subItem) => currentPath === subItem.path)
    );
    if (activeDropdown) {
      setOpenDropdown(activeDropdown.dropdown);
    } else {
      // If no active dropdown, ensure no dropdowns are open
      setOpenDropdown(null);
    }
  }, [location.pathname]);

  const handleDropdownClick = (dropdown) => {
    // If the clicked dropdown is already open, close it; otherwise, open it and close all others
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const isDropdownOpen = (dropdown) => openDropdown === dropdown;

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    {
      name: "RFQ Management",
      icon: <MdOutlineRequestQuote sx={{ fontSize: 24 }} />,
      dropdown: "rfq",
      items: [
        {
          name: "Customer RFQs",
          icon: <MdOutlineGroup sx={{ fontSize: 20 }} />,
          path: "/customer-rfqs",
        },
        {
          name: "RFQ Dashboard",
          icon: <MdOutlineSpaceDashboard sx={{ fontSize: 20 }} />,
          path: "/rfq-dashboard",
        },
        {
          name: "Partner RFQ Response",
          icon: <MdOutlineAssignment sx={{ fontSize: 20 }} />,
          path: "/partner-rfq-response",
        },
      ],
    },
    {
      name: "Project Management",
      icon: <MdWorkOutline sx={{ fontSize: 24 }} />,
      dropdown: "project",
      items: [
        {
          name: "Project Dashboard",
          icon: <MdOutlineSpaceDashboard sx={{ fontSize: 20 }} />,
          path: "/project-dashboard",
        },
        {
          name: "Upcoming Deliveries",
          icon: <TbTruckDelivery sx={{ fontSize: 20 }} />,
          path: "/upcoming-deliveries",
        },
        {
          name: "Quality Check",
          icon: <MdOutlineHighQuality sx={{ fontSize: 20 }} />,
          path: "/quality-check",
        },
      ],
    },
    {
      name: "Purchase",
      icon: <MdOutlineShoppingCart sx={{ fontSize: 24 }} />,
      dropdown: "purchase",
      items: [
        {
          name: "Vendor POs",
          icon: <BiPurchaseTag sx={{ fontSize: 20 }} />,
          path: "/vendor-pos",
        },
        {
          name: "Vendor Invoices",
          icon: <MdOutlineReceiptLong sx={{ fontSize: 20 }} />,
          path: "/vendor-invoices",
        },
        {
          name: "Request/View Payments",
          icon: <MdOutlinePreview sx={{ fontSize: 20 }} />,
          path: "/view-payments",
        },
      ],
    },
    {
      name: "Drawing Version",
      icon: <MdOutlineDescription sx={{ fontSize: 24 }} />,
      dropdown: "drawing",
      items: [
        {
          name: "Add Drawing",
          icon: <RxDrawingPin sx={{ fontSize: 20 }} />,
          path: "/add-drawing",
        },
        {
          name: "View Drawings",
          icon: <MdOutlineRemoveRedEye sx={{ fontSize: 20 }} />,
          path: "/view-drawings",
        },
      ],
    },
    {
      name: "Assets",
      icon: <MdOutlineInventory sx={{ fontSize: 24 }} />,
      dropdown: "asset",
      items: [
        {
          name: "Add Assets",
          icon: <MdWebAsset sx={{ fontSize: 20 }} />,
          path: "/add-assets",
        },
        {
          name: "View Assets",
          icon: <MdOutlinePreview sx={{ fontSize: 20 }} />,
          path: "/view-assets",
        },
        {
          name: "Asset Utilisation",
          icon: <MdOutlineSpaceDashboard sx={{ fontSize: 20 }} />,
          path: "/asset-utilisation",
        },
      ],
    },
    // {
    //   name: "Visits",
    //   icon: <MdOutlineEvent sx={{ fontSize: 24 }} />,
    //   dropdown: "visit",
    //   items: [
    //     {
    //       name: "Add Visits",
    //       icon: <FiPlusSquare sx={{ fontSize: 20 }} />,
    //       path: "/add-visits",
    //     },
    //     {
    //       name: "View Visits",
    //       icon: <MdOutlineRemoveRedEye sx={{ fontSize: 20 }} />,
    //       path: "/view-visits",
    //     },
    //   ],
    // },
  ];

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/dashboard">
            <Button
              className={`w-100 ${isActive("/dashboard") ? "active" : ""}`}
              onClick={() => setOpenDropdown(null)} // Close all dropdowns when Dashboard is clicked
            >
              <span className="icon">
                <MdOutlineSpaceDashboard sx={{ fontSize: 24 }} />
              </span>{" "}
              Dashboard
            </Button>
          </Link>
        </li>
        {menuItems.map((menuItem, index) => (
          <li key={menuItem.name}>
            <Button
              className={`w-100 ${
                isDropdownOpen(menuItem.dropdown) ? "active" : ""
              }`}
              onClick={() => handleDropdownClick(menuItem.dropdown)}
            >
              <span className="icon">{menuItem.icon}</span>
              {menuItem.name}
              <span className="arrow">
                {isDropdownOpen(menuItem.dropdown) ? (
                  <FaAngleDown />
                ) : (
                  <FaAngleRight />
                )}
              </span>
            </Button>
            <div
              className={`submenuWrapper ${
                isDropdownOpen(menuItem.dropdown) ? "collapsed" : "collapse"
              }`}
            >
              <ul className="submenu">
                {menuItem.items.map((subItem) => (
                  <li key={subItem.name}>
                    <Link to={subItem.path}>
                      <Button
                        className={`w-100 ${
                          isActive(subItem.path) ? "active" : ""
                        }`}
                      >
                        <span className="icon">{subItem.icon}</span>
                        {subItem.name}
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}

        <li>
          <Link to="/analytics">
            <Button
              className={`w-100 ${isActive("/") ? "active" : ""}`}
              onClick={() => setOpenDropdown(null)}
            >
              <span className="icon">
                <MdOutlineSpaceDashboard sx={{ fontSize: 24 }} />
              </span>{" "}
              Analytics
            </Button>
          </Link>
        </li>

        <li>
          <Link to="/loginReport">
            <Button
              className={`w-100 ${isActive("/") ? "active" : ""}`}
              onClick={() => setOpenDropdown(null)}
            >
              <span className="icon">
                <MdOutlineSpaceDashboard sx={{ fontSize: 24 }} />
              </span>{" "}
              Login Report
            </Button>
          </Link>
        </li>

        {/* Settings and Logout */}
        {/* <li>
          <Link to="/settings">
            <Button className="w-100">
              <span className='icon'><MdOutlineSettings sx={{ fontSize: 24 }} /></span> Settings
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/logout">
            <Button className="w-100">
              <span className='icon'><MdOutlineExitToApp sx={{ fontSize: 24 }} /></span> Logout
            </Button>
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
