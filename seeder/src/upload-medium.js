import fetch from 'node-fetch';
import settings from './config/settings';

const uploadMediumByRemoteUrl = async (remoteUrl) => {
  try {
    const response = await fetch(`${settings.HYGRAPH_ASSETS_UPLOAD_API}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${settings.HYGRAPH_ACCESS_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `url=${encodeURIComponent(
        remoteUrl,
      )}`,
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export default uploadMediumByRemoteUrl;
