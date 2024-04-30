import axios from 'axios';
import { baseURL } from '../shared/consts/baseURL';

const api = axios.create({ baseURL: baseURL });

interface IAuthUserOptions {
  login: string;
  password: string;
}

interface IRegisterUserOptions {
  phone: string;
}

interface IVerifyUser {
  phone: string;
  smsCode?: number;
  password?: string;
}

async function loginUser({ login, password }: IAuthUserOptions) {
  return await api.post(
    `/auth/users/login`,
    {
      phone: login,
      password
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    }
  );
}

async function registerUser({ phone }: IRegisterUserOptions) {
  return await api.post(
    `/auth/users/register`,
    {},
    {
      params: {
        phone
      }
    }
  );
}

async function verifyUser({ phone, smsCode }: IVerifyUser) {
  return await api.post(
    `/auth/users/register/verify`,
    {},
    {
      params: {
        phone: phone,
        code: smsCode
      }
    }
  );
}

async function resendVerify({ phone }: IVerifyUser) {
  return await api.post(
    `/auth/users/register/verify/code/resend`,
    {},
    {
      params: {
        phone: phone
      }
    }
  );
}

async function setPassword({ phone, smsCode, password }: IVerifyUser) {
  return await api.post(
    `/auth/useres/register/password/set`,
    {},
    {
      params: {
        phone: phone,
        code: smsCode,
        password: password
      }
    }
  );
}

export const authApi = {
  loginUser,
  registerUser,
  verifyUser,
  resendVerify,
  setPassword
};
