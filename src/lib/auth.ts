import api from './api';
import { setCookie } from 'cookies-next';

// Login and save tokens to cookies
export const login = async (username: string, password: string) => {
  const res = await api.post('/api/token/', { username, password });

  // Store access and refresh tokens in cookies with expiry time (e.g., 1 hour for access token)
  setCookie('cbt_access', res.data.access, { maxAge: 60 * 60 }); // 1 hour expiry
  setCookie('cbt_refresh', res.data.refresh, { maxAge: 60 * 60 * 24 * 30 }); // 30 days expiry

  return res.data;
};


// Register a new user and save tokens
export const register = async (username: string, email: string, password: string, otp: string, organization_id?: string) => {
  const res = await api.post('/api/register/', { username, email, password, otp, organization_id: organization_id || null });

  // Store access and refresh tokens in cookies
  setCookie('reminderx_access', res.data.access, { maxAge: 60 * 60 });
  setCookie('reminderx_refresh', res.data.refresh, { maxAge: 60 * 60 * 24 * 30 });

  return res.data;
};

//Reset password token request
export const requestPasswordReset = async (email: string) => {
 const res = await api.post('/api/password_reset/', { email });
  return res.data;
};

// Confirm password reset (with token and new password)
export const confirmPasswordReset = async (token: string, newPassword: string) => {
  const res = await api.post('/api/password_reset/confirm/', { token, password: newPassword, });
  return res.data;
};

// Logout user and remove tokens from cookies
export const logout = () => {
  // Remove the access and refresh tokens cookies
  document.cookie = 'cbt_access=; Max-Age=0; path=/';
  document.cookie = 'cbt_refresh=; Max-Age=0; path=/';
};
