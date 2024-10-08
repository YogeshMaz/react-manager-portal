import axios from "axios";
import "./profile.css";
import React, { useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiFacebook } from "react-icons/fi";
import { publishedUrls } from "../../components/zohoAssets/PublishedUrl";
import { constructImageUrl } from "../../components/columns/utilities/ConstructImageUrl";
import { AppNames } from "../../components/zohoAssets/AppLists";
import { ReportNameLists } from "../../components/zohoAssets/ReportLists";
const apiUrl = process.env.REACT_APP_LOCALHOST;

const Profile = () => {
  const [userInfos, setUserInfos] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfos = async () => {
      try {
        const response = await axios.get(apiUrl + "/api/userInfos");
        setUserInfos(response.data); // Set the response data directly, assuming it's a string
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user info:", err);
        setError("Failed to fetch user information.");
        setLoading(false);
      }
    };

    fetchUserInfos();
  }, []);

  let imageUrl = "";
  if (userInfos?.profile) {
    imageUrl = constructImageUrl(
      userInfos?.profile,
      AppNames.PM,
      ReportNameLists.loginManagement.employeeDatabase,
      userInfos?.ID,
      "Upload_Photo",
      publishedUrls.LoginManagement.employeeDatabase
    );
  } else {
    imageUrl = "https://img.icons8.com/bubbles/100/000000/user.png";
  }

  return (
    <div>
      <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-xl-10 col-md-12">
              <div className="card user-card-full">
                <div className="row m-l-0 m-r-0">
                  {userInfos ? (
                    <>
                      <div className="col-sm-5 bg-c-lite-green user-profile">
                        <div className="card-block text-center text-white">
                          <div className="m-b-25 rounded-circle">
                            {imageUrl}
                            {/* <p>{userInfos?.profile || 'N/A'}</p> */}
                          </div>
                          <h6 className="f-w-600">
                            {userInfos?.name || "N/A"}
                          </h6>
                          <p>{userInfos?.role || "N/A"}</p>
                          <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                        </div>
                      </div>
                      <div className="col-sm-7">
                        <div className="card-block">
                          <h5 className="m-b-20 p-b-5 b-b-default f-w-600">
                            Information
                          </h5>
                          <div className="row">
                            <div className="col-sm-6">
                              <p className="m-b-10 f-w-600">Email</p>
                              <h6 className="text-muted f-w-400">
                                {userInfos?.email || "N/A"}
                              </h6>
                            </div>
                            <div className="col-sm-6">
                              <p className="m-b-10 f-w-600">Phone</p>
                              <h6 className="text-muted f-w-400">
                                98979989898
                              </h6>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-sm-6">
                              <p className="m-b-10 f-w-600">
                                Organisation Name
                              </p>
                              <h6 className="text-muted f-w-400">
                                Organisation
                              </h6>
                            </div>
                            <div className="col-sm-6">
                              <p className="m-b-10 f-w-600">Address</p>
                              <h6 className="text-muted f-w-400">Address</h6>
                            </div>
                          </div>
                          <ul className="social-link list-unstyled m-t-40 m-b-10">
                            <li>
                              <a
                                href="#!"
                                className="social_m_bg fb"
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title=""
                                data-original-title="facebook"
                                data-abc="true"
                              >
                                <FiFacebook />
                              </a>
                            </li>
                            <li>
                              <a
                                href="#!"
                                className="social_m_bg twitter"
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title=""
                                data-original-title="twitter"
                                data-abc="true"
                              >
                                <FaXTwitter />
                              </a>
                            </li>
                            <li>
                              <a
                                href="#!"
                                className="social_m_bg insta"
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title=""
                                data-original-title="instagram"
                                data-abc="true"
                              >
                                <FaInstagram />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </>
                  ) : (
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
