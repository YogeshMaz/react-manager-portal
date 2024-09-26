import axios from 'axios';

async function fetchData(access_token, functionName, userEmail) {
  try {
    const response = await axios.get('https://www.zohoapis.in/creator/custom/arun.ramu_machinemaze/'+functionName+'?email='+userEmail, {
      headers: {
        'Authorization': 'Zoho-oauthtoken ' + access_token,
        'Cookie': 'ZCNEWLIVEUI=true; _zcsr_tmp=eec5b11f-1318-4647-966e-8ac6c7e73d3c; zalb_f8176abf63=a539d37ef14f6946f36de06c7a4375f2; zccpn=eec5b11f-1318-4647-966e-8ac6c7e73d3c'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

export default fetchData;
