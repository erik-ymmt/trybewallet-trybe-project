import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { string } from 'stylelint/lib/formatters';
import { fetchCurrencies, fetchCurrenciesExchange } from '../redux/actions';

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

  getFormValues = (event) => {
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

  render() {
    const { currencies } = this.props;
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
              <option key={ currency } value={ currency }>{currency}</option>)) }
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
        <button
          type="button"
          onClick={ this.getFormValues }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

// id, value, currency, method, tag, description e exchangeRates

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  getId: state.wallet.expenses,
});

// const mapDispatchToProps = (dispatch) => ({
//   saveFormData: (formData) => dispatch(fetchCurrenciesExchange(formData)),
// });

export default connect(mapStateToProps, null)(WalletForm);

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(string).isRequired,
  getId: PropTypes.arrayOf(string).isRequired,
  dispatch: PropTypes.func.isRequired,
};
