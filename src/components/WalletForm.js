import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { string } from 'stylelint/lib/formatters';
import { editExpenseAction,
  fetchCurrencies,
  fetchCurrenciesExchange,
} from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  getIdFromState = () => {
    const { getId } = this.props;
    return getId.length;
  }

  clearForm = () => {}

  saveFormValues = (event) => {
    const { dispatch } = this.props;
    event.preventDefault();
    const form = document.getElementById('wallet-form');
    const formData = new FormData(form);
    const formValues = {
      id: this.getIdFromState(),
      value: formData.get('value'),
      description: formData.get('description'),
      currency: formData.get('currency'),
      method: formData.get('method'),
      tag: formData.get('tag'),
    };
    dispatch(fetchCurrenciesExchange(formValues));
    form.reset();
  }

  // referência FormData: https://stackoverflow.com/questions/588263/how-can-i-get-all-a-forms-values-that-would-be-submitted-without-submitting

  editFormValues = (event) => {
    const { dispatch, idToEdit, exchangeRates } = this.props;
    event.preventDefault();
    const form = document.getElementById('wallet-form');
    const formData = new FormData(form);
    const formValues = {
      id: idToEdit,
      value: formData.get('value'),
      description: formData.get('description'),
      currency: formData.get('currency'),
      method: formData.get('method'),
      tag: formData.get('tag'),
      exchangeRates: exchangeRates(idToEdit),
    };
    // console.log(formValues);
    dispatch(editExpenseAction(formValues));
    form.reset();
  }

  render() {
    const { currencies, editor } = this.props;
    return (
      <form id="wallet-form">
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            data-testid="value-input"
            name="value"
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            type="text"
            data-testid="description-input"
            name="description"
          />
        </label>
        <label htmlFor="currencies">
          Moeda:
          <select name="currency" id="currency" data-testid="currency-input">
            {currencies.map((currency) => (
              <option key={ currency } value={ currency }>{currency}</option>))}
          </select>
        </label>
        <label htmlFor="method">
          <select data-testid="method-input" name="method">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="type">
          <select data-testid="tag-input" name="tag">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        { editor
          ? (
            <button
              type="button"
              onClick={ this.editFormValues }
            >
              Editar despesa
            </button>
          )
          : (
            <button
              type="button"
              onClick={ this.saveFormValues }
            >
              Adicionar despesa
            </button>
          )}

      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  getId: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  exchangeRates: (id) => state.wallet.expenses
    .find((expense) => expense.id === id).exchangeRates,
});

export default connect(mapStateToProps)(WalletForm);

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(string).isRequired,
  getId: PropTypes.arrayOf(string).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  exchangeRates: PropTypes.func.isRequired,
};
