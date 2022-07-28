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
        <input type="number" data-testid="value-input" />
        <input type="text" data-testid="description-input" />
        <select name="currency" id="currency" data-testid="currency-input">
          {currencies.map((currency) => (
            <option key={ currency } value={ currency }>{currency}</option>)) }
        </select>
        <input type="" />
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
