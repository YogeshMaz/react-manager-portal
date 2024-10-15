import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, CircularProgress, Alert } from '@mui/material';
import Button from '@mui/material/Button'; 
import { Long } from 'bson';
import { ReportNameLists } from '../zohoAssets/ReportLists';
import { AppNames } from '../zohoAssets/AppLists';
import { publishedUrls } from '../zohoAssets/PublishedUrl';
import { constructImageSrc } from '../columns/utilities/ConstructImageSrc';

const apiUrl = process.env.REACT_APP_LOCALHOST;

const UserInfos = () => {
  const [userInfos, setUserInfos] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfos = async () => {
      try {
        const response = await axios.get(apiUrl + '/api/userInfos');
        setUserInfos(response.data); // Set the response data directly, assuming it's a string
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user info:", err);
        setError('Failed to fetch user information.');
        setLoading(false);
      }
    };

    fetchUserInfos();
  }, []); // Empty dependency array ensures this runs only on component mount

  let imageUrl = "";
  const low = userInfos?.ID?.low;
  const high = userInfos?.ID?.high;
  const mergedID = Long.fromBits(low, high);
  if (userInfos?.profile) {
    imageUrl = constructImageSrc(
      userInfos?.profile,
      AppNames.PM,
      ReportNameLists.loginManagement.employeeDatabase,
      mergedID,
      "Upload_Photo",
      publishedUrls.LoginManagement.employeeDatabase
    );
  } else {
    imageUrl = "https://img.icons8.com/bubbles/100/000000/user.png";
  }


  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box padding={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <>
      <Button className="myAcc d-flex align-items-center"> 
          <div className="userImg">
              <span className="rounded-circle">
                  {imageUrl}
              </span>
          </div>
          <div className="userInfo">
              <h4>{userInfos.name}</h4>
              <p className="mb-0">{userInfos.email}</p>
          </div>
      </Button>
    </>
    // <Paper style={{ padding: 7, marginLeft: 10}}>
    //   <Typography variant="small">Manager Email</Typography>
    //   <Box ml={0}>
    //     <Typography variant="body1">{userInfos}</Typography>
    //   </Box>
    // </Paper>
  );
};

export default UserInfos;
