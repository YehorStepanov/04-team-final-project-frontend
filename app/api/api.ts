import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://zero4-team-final-project-backend.onrender.com',
  withCredentials: true,
});
