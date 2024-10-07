import { Link } from "react-router-dom";
import logo from "../images/MM.jpeg";
import SearchBox from "../components/searchbox";
import Button from "@mui/material/Button";
import {
  MdMenuOpen,
  MdOutlineLightMode,
  MdOutlineDarkMode,
  MdOutlineMenu,
  MdNotificationsNone,
  MdOutlineMailOutline,
} from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoIosCart } from "react-icons/io";
import React, { useContext, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import { Avatar } from "@mui/material";
import { MyContext } from "../App";
import { useTheme } from "../components/ThemeContext"; // Import useTheme hook
import UserInfos from "./hooks/fetchApiDetails";
import { useAuth } from "../pages/Authentication/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear authentication state
    navigate("/login"); // Redirect to login page
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isOpennotificationDrop, setIsOpennotificationDrop] = useState(false);
  const open = Boolean(anchorEl);
  const opennoti = Boolean(isOpennotificationDrop);

  const context = useContext(MyContext);

  const handleOpenMyAccDrop = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMyAccDrop = () => {
    setAnchorEl(null);
  };
  const handleOpenNotificationsDrop = () => {
    setIsOpennotificationDrop(true);
  };
  const handleCloseNotificationsDrop = () => {
    setIsOpennotificationDrop(false);
  };

  // Use theme context to toggle between light and dark modes
  const { toggleTheme, theme } = useTheme();

  return (
    <header className="d-flex align-items-center">
      <div className="container-fluid w-100">
        <div className="row d-flex align-items-center">
          {/* Logo Wrapper */}
          <div className="col-sm-2">
            <Link to={"/"} className="d-flex align-items-center logo">
              <img src={logo} alt="Logo" />
              <span className="ml-2">Machine Maze</span>
            </Link>
          </div>

          <div className="col-sm-3 d-flex align-items-center part2 p1-4">
            <Button
              className="rounded-circle mr-3"
              onClick={() =>
                context.setIsToggleSidebar(!context.isToggleSidebar)
              }
            >
              {context.isToggleSidebar === false ? (
                <MdMenuOpen />
              ) : (
                <MdOutlineMenu />
              )}
            </Button>
            <SearchBox />
          </div>

          <div className="col-sm-7 d-flex align-items-center justify-content-end part3">
            {/* Theme Toggle Button */}
            <Button className="rounded-circle mr-3" onClick={toggleTheme}>
              {theme === "light" ? (
                <MdOutlineDarkMode />
              ) : (
                <MdOutlineLightMode />
              )}
            </Button>

            <Button className="rounded-circle mr-3">
              <IoIosCart />
            </Button>
            <Button className="rounded-circle mr-3">
              <MdOutlineMailOutline />
            </Button>
            <Button
              className="rounded-circle mr-3"
              onClick={handleOpenNotificationsDrop}
            >
              <MdNotificationsNone />
            </Button>

            {/* Notification Dropdown */}
            <Menu
              anchorEl={isOpennotificationDrop}
              className="notifications dropdown_list"
              id="notifications"
              open={opennoti}
              onClose={handleCloseNotificationsDrop}
              onClick={handleCloseNotificationsDrop}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {/* Sample Notification Items */}
              <MenuItem onClick={handleClose}>
                <div className="d-flex">
                  <div>
                    <span className="rounded-circle">
                      <img
                        src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"
                        alt="User"
                      />
                    </span>
                  </div>
                  <div className="dropdownInfo">
                    <h4>
                      <b>Mahmudul</b> added to his favorite list{" "}
                      <b>Leather belt steve madden</b>
                    </h4>
                  </div>
                </div>
              </MenuItem>
            </Menu>

            <div className="myAccwrapper" onClick={handleOpenMyAccDrop}>
              <UserInfos />
            </div>

            {/* Account Dropdown */}
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleCloseMyAccDrop}
              onClick={handleCloseMyAccDrop}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Link to="/profile">
                <MenuItem onClick={handleClose}>
                  <FaRegUserCircle /> Profile
                </MenuItem>
              </Link>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <FiLogOut />
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
