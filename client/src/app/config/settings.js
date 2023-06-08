const settings = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HYGRAPH_CONTENT_API: process.env.REACT_APP_HYGRAPH_CONTENT_API,
  HYGRAPH_ACCESS_TOKEN: process.env.REACT_APP_HYGRAPH_ACCESS_TOKEN,
  AUTH_KEY_LOCALSTORAGE: 'react-boilerplate-pgm-4:currentUser',
};

export default settings;