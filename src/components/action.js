import { NEW_USER } from './types';

export const createUser = (userData) => dispatch => {
  fetch('http://10.10.1.113:5000/api/users/v1/register', {
    method: 'POST',
    headers: {
      'Content-Type' : 'Application/json'
    },
    body: JSON.stringify(userData)
  })
  .then(res=> res.json())
  .then(users => dispatch({
    type: NEW_USER,
    payload: users
  }));
}







