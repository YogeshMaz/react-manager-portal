import axios from 'axios';
import './profile.css'
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiFacebook } from "react-icons/fi";


const Profile = () => {
    // const [userData, setUserData] = useState(null);

    const userData ={
        email: "gagan.p@machinemaze.com",
        role: "Doctor",
    }

    // useEffect(() => {
        // Function to fetch profile data
    //     const getProfileData = () => {
    //         const token = JSON.parse(localStorage.getItem('token'));
    //         const header = {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         };

    //         axios.get('https://api.escuelajs.co/api/v1/users', header)
    //             .then((res) => {
    //                 console.log('Profile data', res.data); // Log the response to check data structure
    //                 if (Array.isArray(res.data) && res.data.length > 0) {
    //                     // If the response is an array, set the first user's data
    //                     setUserData(res.data[0]);
    //                 } else {
    //                     setUserData(res.data);
    //                 }
    //             })
    //             .catch((err) => {
    //                 alert('You are not logged in');
    //                 console.log('Error occurred', err);
    //             });
    //     };

    //     // Call the function to fetch the data when the component mounts
    //     getProfileData();
    // }, []); // Empty dependency array ensures this runs only once when the component mounts

    return (
        <div>
            <div className="page-content page-container" id="page-content">
                <div className="padding">
                    <div className="row container d-flex justify-content-center">
                        <div className="col-xl-10 col-md-12">
                            <div className="card user-card-full">
                                <div className="row m-l-0 m-r-0">
                                    { userData ? (
                                    <>
                                        <div className="col-sm-5 bg-c-lite-green user-profile">
                                            <div className="card-block text-center text-white">
                                                <div className="m-b-25">
                                                    <img src="https://img.icons8.com/bubbles/100/000000/user.png" className="img-radius" alt="User-Profile-Image"/>
                                                </div>
                                                <h6 className="f-w-600">{userData?.name || 'N/A'}</h6>
                                                <p>{userData?.role || 'N/A'}</p>
                                                <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                            </div>
                                        </div>
                                        <div className="col-sm-7">
                                            <div className="card-block">
                                                <h5 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h5>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Email</p>
                                                        <h6 className="text-muted f-w-400">{userData?.email || 'N/A'}</h6>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Phone</p>
                                                        <h6 className="text-muted f-w-400">98979989898</h6>
                                                    </div>
                                                </div>
                                                <div className='row mt-3'>
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Organisation Name</p>
                                                        <h6 className="text-muted f-w-400">Organisation</h6>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Address</p>
                                                        <h6 className="text-muted f-w-400">Address</h6>
                                                    </div>
                                                </div>
                                                <ul className="social-link list-unstyled m-t-40 m-b-10">
                                                    <li>
                                                        <a href="#!" className='social_m_bg fb' data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true">
                                                            <FiFacebook/>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#!" className='social_m_bg twitter' data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true">
                                                            <FaXTwitter/>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#!" className='social_m_bg insta' data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true">
                                                            <FaInstagram/>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </>
                                    )
                                    : (
                                        <p>Loading profile data...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
    );
};

export default Profile;
