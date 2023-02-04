import axios from 'axios';

export const baseURL = 'http://10.0.0.106:3001';

export const api = axios.create({
  baseURL
});