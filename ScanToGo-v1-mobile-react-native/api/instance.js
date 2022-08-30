import axios from "axios";
import { store } from "state-pool"
axios.defaults.baseURL = 'http://app.deltamatemyanmar.com/api';
axios.defaults.headers.common['Authorization'] = store.getState('token');

export default axios;