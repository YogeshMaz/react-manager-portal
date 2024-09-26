import 'dotenv/config';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

const TOKEN_FILE_PATH = path.resolve('token.json'); // Adjust the path as needed

async function generateAccessToken() {
  const params = new URLSearchParams({
    refresh_token: process.env.ZOHO_REFRESH_TOKEN,
    client_id: process.env.ZOHO_CLIENT_ID,
    client_secret: process.env.ZOHO_CLIENT_SECRET,
    grant_type: 'refresh_token',
  });

  try {
    const response = await axios.post('https://accounts.zoho.in/oauth/v2/token', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token, expires_in } = response.data;

    // Calculate expiration time
    const expirationTime = Date.now() + expires_in * 1000; // Convert seconds to milliseconds
    console.log(Date.now());
    console.log(expires_in);
    console.log(expires_in * 1000);
    console.log(expirationTime);

    // Save to file
    fs.writeFileSync(TOKEN_FILE_PATH, JSON.stringify({ access_token, expirationTime }, null, 2));

    console.log("Access Token Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error response data:", error.response?.data);
    console.error("Error status code:", error.response?.status);
    console.error("Error headers:", error.response?.headers);
    throw new Error(`Failed to fetch access token: ${error.message}`);
  }
}

export default generateAccessToken;
