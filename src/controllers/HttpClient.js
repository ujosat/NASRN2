import axios from 'axios';
import Config from 'react-native-config';



const client = axios.create({
  baseURL: Config.API_URL,
  timeout: 100000,
  headers: { 'content-type': 'application/json' },
});



export default client;
