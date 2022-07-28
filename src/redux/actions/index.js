export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const ADD_EXPENSE = 'ADD_EXPENSE';
// export const EDIT_EXPENSE: 'EDIT_EXPENSE';
// export const FINISH_EDIT_EXPENSE: 'FINISH_EDIT_EXPENSE';
// export const ADD_CURRENCIES: 'ADD_CURRENCIES';

export const userAction = (email) => ({ type: LOGIN_SUCCESS, email });
