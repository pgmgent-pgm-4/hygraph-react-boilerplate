import { AwesomeGraphQLClient } from 'awesome-graphql-client';

import fetch from 'node-fetch';
import settings from './config/settings';

const client = new AwesomeGraphQLClient({
  endpoint: `${settings.HYGRAPH_CONTENT_API}`,
  fetch,
  fetchOptions: {
    headers: {
      Authorization: `Bearer ${settings.HYGRAPH_ACCESS_TOKEN}`,
    },
  },
});


export default client;
export {
  
};
