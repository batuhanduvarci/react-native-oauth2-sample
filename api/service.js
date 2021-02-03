import {useContext} from 'react';
import {UserDataContext} from '../App';
import axios from 'axios';

export default axios
  .create({
    baseURL: 'https://dev-ja8-m7r2.eu.auth0.com/api/v2/',
  })
  .interceptors.request.use((config) => {
    const token = useContext(UserDataContext);
    config.headers.Authorization = token ? `Bearer ${token.accessToken}` : '';
  });
