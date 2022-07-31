import {
  ADD_EXPENSE,
  REQUEST_CURRENCIES_LOADING, REQUEST_CURRENCIES_SUCCESS,
  REQUEST_CURRENCIES_FAIL, REMOVE_EXPENSE, EDIT_EXPENSE, ACTIVATE_EDIT_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const walletReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, payload] };

  case REMOVE_EXPENSE:
    return { ...state,
      expenses: state.expenses.filter((expense) => expense.id !== payload) };

  case ACTIVATE_EDIT_EXPENSE:
    return { ...state,
      idToEdit: payload,
      editor: true,
    };

  case EDIT_EXPENSE:
    return { ...state,
      editor: false,
      expenses: state.expenses.map((expense) => {
        if (expense.id === payload.id) {
          return payload;
        }
        return expense;
      }),
    };

  case REQUEST_CURRENCIES_LOADING:
    return { ...state, currencies: payload };

  case REQUEST_CURRENCIES_SUCCESS:
    return { ...state, currencies: payload };

  case REQUEST_CURRENCIES_FAIL:
    return { ...state, currencies: payload };

  default:
    return state;
  }
};

export default walletReducer;
