export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const ACTIVATE_EDIT_EXPENSE = 'ACTIVATE_EDIT_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
// export const FINISH_EDIT_EXPENSE = 'FINISH_EDIT_EXPENSE';
export const REQUEST_CURRENCIES_LOADING = 'REQUEST_CURRENCIES_LOADING';
export const REQUEST_CURRENCIES_SUCCESS = 'REQUEST_CURRENCIES_SUCCESS';
export const REQUEST_CURRENCIES_FAIL = 'REQUEST_CURRENCIES_FAIL';

export const userAction = (email) => ({ type: LOGIN_SUCCESS, email });

const currenciesActionProgress = () => ({
  type: REQUEST_CURRENCIES_LOADING,
  payload: ['carregando'],
});
const currenciesAction = (data) => ({
  type: REQUEST_CURRENCIES_SUCCESS,
  payload: data,
});
const currenciesActionFail = () => ({
  type: REQUEST_CURRENCIES_FAIL,
  payload: ['erro no servidor'],
});

export const fetchCurrencies = () => (
  async (dispatch) => {
    dispatch(currenciesActionProgress());
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const currencies = Object.keys(data).filter((cur) => cur !== 'USDT');
      dispatch(currenciesAction(currencies));
    } catch (error) {
      dispatch(currenciesActionFail());
    }
  }
);

export const addExpenseAction = (formData, exchangeRates) => ({
  type: ADD_EXPENSE,
  payload: { ...formData, exchangeRates },
});

export const removeExpenseAction = (id) => ({
  type: REMOVE_EXPENSE,
  payload: id,
});

export const activateEditionAction = (id) => ({
  type: ACTIVATE_EDIT_EXPENSE,
  payload: id,
});

export const editExpenseAction = (editedExpense) => ({
  type: EDIT_EXPENSE,
  payload: editedExpense,
});

export const fetchCurrenciesExchange = (formData) => (
  async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      dispatch(addExpenseAction(formData, data));
    } catch (error) {
      // TODO dispatch(currenciesActionFail());
    }
  }
);
