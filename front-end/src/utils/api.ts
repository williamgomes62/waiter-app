import axios from 'axios';

export const API_URL = 'https://waiter-app-production.up.railway.app';

export const api = axios.create({
  baseURL: API_URL,
});