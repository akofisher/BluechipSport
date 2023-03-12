import axios from 'axios';

const baseURL = process.env.REST_API_URL;

export const apiCall = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${token}`,
  },
});

export const setTokenHeader = (token: string) => {
  if (token) {
    apiCall.defaults.headers.common.authorization = `Bearer ${token}`;
  } else {
    apiCall.defaults.headers.common.authorization = 'Bearer ';
  }
};

apiCall.interceptors.response.use(
  function (response) {
    return response.data;
  },

  function (error) {
    let res = error.response;
    if (error.response.status === 401) {
      window.location.reload();
    }

    console.error('Looks like there was a problem. Status Code: ' + res.status);
    return Promise.reject(error);
  },
);

export default apiCall;
