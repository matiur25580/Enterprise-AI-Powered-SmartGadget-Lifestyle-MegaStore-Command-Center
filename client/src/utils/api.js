const configuredApiUrl = import.meta.env.VITE_API_URL;
const defaultApiUrl = import.meta.env.DEV
  ? 'http://localhost:10000'
  : 'https://enterprise-ai-powered-smartgadget.onrender.com';

export const API = (configuredApiUrl || defaultApiUrl).replace(/\/$/, '');
