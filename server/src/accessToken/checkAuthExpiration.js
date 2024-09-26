import fs from 'fs';
import path from 'path';
import generateAccessToken from './generateToken.js';

const TOKEN_FILE_PATH = path.resolve('token.json'); // Adjust the path as needed

async function getAccessToken() {
  if (fs.existsSync(TOKEN_FILE_PATH)) {
    const tokenData = JSON.parse(fs.readFileSync(TOKEN_FILE_PATH, 'utf8'));
    // const currentTimestamp = Date.now();
    // console.log("Current Timestamp:", currentTimestamp);

    console.log(tokenData.expirationTime);
    if (Date.now() < tokenData.expirationTime) {
      // Token is still valid
      return tokenData.access_token;
    }
  }

  // Token is either expired or doesn't exist, generate a new one
  const newTokenData = await generateAccessToken();
  return newTokenData.access_token;
}

export default getAccessToken;
