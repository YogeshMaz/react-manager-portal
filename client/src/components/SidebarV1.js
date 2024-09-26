
// import Button from '@mui/material/Button'; 
// import { MdDashboard } from "react-icons/md";
// import { FaAngleRight } from "react-icons/fa";
// import { MdOutlineProductionQuantityLimits } from "react-icons/md"; 
// import { IoCartOutline } from "react-icons/io5";
// import { FaProductHunt } from "react-icons/fa";
// import { Link } from 'react-router-dom';
// import React, {useContext, useState} from 'react';
// import { FaTable } from "react-icons/fa";

// import { MyContext } from "../../App";


// const SideBar = () => {

    
//     const [activeTab, setActiveTab] = useState(0);
//     const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);

//     const context = useContext(MyContext);

//     const isOpenSubmenu=(index)=>{
//         setActiveTab(index);
//         setIsToggleSubmenu (!isToggleSubmenu)
//     }

//     return(
//         <>
//             <div className='sidebar'>
//                 <ul>
//                     <li>
//                         <Link to="/">
//                             <Button className={`w-100 ${activeTab===0 ? 'active': ''}`} onClick={() =>isOpenSubmenu (0)}>
//                                 <span className='icon'> <MdDashboard/></span> Dashboard
//                                 {/* <span className='arrow'><FaAngleRight/></span>  */}
//                             </Button>
//                         </Link>
//                     </li>
//                     <li>
//                         <Link to="/table">
//                             <Button className={`w-100 ${activeTab===1 ? 'active': ''}`} onClick={() =>isOpenSubmenu (1)}>
//                                 <span className='icon'><FaTable/></span> Table
//                                 {/* <span className='arrow'><FaAngleRight/></span>  */}
//                             </Button>
//                         </Link>
//                     </li>
//                     <li>
//                         <Button className={`w-100 ${activeTab===2 && isToggleSubmenu===true ? 'active': ''}`} onClick={() =>isOpenSubmenu (2)}>
//                             <span className='icon'><FaProductHunt /></span>
//                             Products
//                             <span className='arrow'><FaAngleRight /></span> 
//                         </Button>
//                         <div className={`submenuWrapper ${activeTab===2 && isToggleSubmenu===true ? 'collapsed' :'collapse'}`}>
//                             <ul className='submenu'>
//                                 <li><Link to="#">Product List</Link></li> 
//                                 <li><Link to="#">Product View</Link></li> 
//                                 <li><Link to="#">Product Upload</Link></li>
//                             </ul>
//                         </div>
//                     </li>
//                     <li>
//                         <Link to="/">
//                             <Button className={`w-100 ${activeTab===3 ? 'active': ''}`} onClick={() =>isOpenSubmenu (3)}>
//                                 <span className='icon'><IoCartOutline/></span> Orders
//                                 {/* <span className='arrow'><FaAngleRight/></span>  */}
//                             </Button>
//                         </Link>
//                     </li>
//                     <li>
//                         <Link to="/">
//                             <Button className={`w-100 ${activeTab===4 && isToggleSubmenu===true ? 'active': ''}`} onClick={() =>isOpenSubmenu (4)}>
//                                 <span className='icon'><MdOutlineProductionQuantityLimits/></span> Message
//                                 {/* <span className='arrow'><FaAngleRight/></span>  */}
//                             </Button>
//                         </Link>
//                     </li>
//                 </ul>

                
//                 <br />
//                 <div className='logoutWrapper'>
//                     <div className='logoutBox'>
//                         <Button variant="contained">Logout</Button>
//                     </div>
//                 </div>

//             </div>
//         </>
//     )
// }

// export default SideBar