/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { logoutUser, setAccessToken, setUser } from './userSlice';
import validator from 'validator';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

/*----------------------------------------------------------------------------*/
/* userThrunk                                                                 */
/*----------------------------------------------------------------------------*/
const extractToken = async (email, password) => {
  let res = await axios
    .post('http://localhost:8080/api/auth/login', {
      email: email,
      password: password,
    })
    .catch((error) => {
      if (error.response.status === 401) {
        console.log('Invalid email or password');
      }
    });

  if (res.data.token) {
    let token = res.data.token;

    if (token !== null && validator.isJWT(token)) {
      localStorage.setItem('accessToken', token);
      let decodedUser = jwtDecode(token);
      return { valid: true, token: token, user: decodedUser };
    }

    let localStorageToken = localStorage.getItem('accessToken');
    if (
      localStorageToken !== null &&
      validator.isJWT(localStorageToken.getItem('accessToken'))
    ) {
      let decodedUser = jwtDecode(localStorageToken);
      if (
        decodedUser !== null &&
        decodedUser.exp > new Date().getTime() / 1000
      ) {
        return { valid: true, token: localStorageToken, user: decodedUser };
      }
      console.log('token abgelaufen', localStorageToken);
      return { valid: false, token: null, user: null };
    }
  } else {
    return { valid: false, token: null, user: null };
  }
};

export const login = (email, password) => {
  return async (dispatch) => {
    let data = await extractToken(email, password);

    if (data.unauthorized) {
      console.log('wrong password or username');
    }

    if (data.token === null || !data.valid) {
      dispatch(logoutUser());
    }

    if (data.valid) {
      console.log(data.user);
      dispatch(setAccessToken(data.token));
      dispatch(setUser(data.user));
    }
  };
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/