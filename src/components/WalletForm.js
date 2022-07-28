import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { string } from 'stylelint/lib/formatters';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input type="number" data-testid="value-input" />
        </label>
        <label htmlFor="description">
          Descrição
          <input type="text" data-testid="description-input" />
        </label>
        <label htmlFor="currencies">
          Moeda:
          <select name="currency" id="currency" data-testid="currency-input">
            {currencies.map((currency) => (
              <option key={ currency } value={ currency }>{currency}</option>)) }
          </select>
        </label>
        <label htmlFor="method">
          <select data-testid="method-input">
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="type">
          <select data-testid="tag-input">
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>

      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(string).isRequired,
  dispatch: PropTypes.func.isRequired,
};
