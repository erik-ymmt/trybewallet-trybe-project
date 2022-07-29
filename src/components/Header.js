import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, totalExpenses } = this.props;
    return (
      <header>
        <div data-testid="email-field">
          {email}
        </div>
        <div data-testid="total-field">
          {totalExpenses()}
        </div>
        <div data-testid="header-currency-field">
          BRL
        </div>
      </header>
    );
  }
}

const calculateTotalExpenses = (state) => {
  const { wallet: { expenses } } = state;
  if (expenses.length === 0) {
    return Number(0.00).toFixed(2);
  }
  const sumExpenses = expenses.reduce(((acc, cur) => {
    const exchangeCurrency = cur.currency;
    const originalValue = cur.value;
    const exchangeRate = cur.exchangeRates[exchangeCurrency].ask;
    const exchangedValue = originalValue * exchangeRate;
    // console.log(exchangeCurrency, 'exchangeCurrency');
    // console.log(originalValue, 'originalValue');
    // console.log(exchangeRate, 'exchangeRate');
    return Number(acc) + exchangedValue;
  }), 0.00);
  return sumExpenses.toFixed(2);
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpenses: () => calculateTotalExpenses(state),
});

export default connect(mapStateToProps, null)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpenses: PropTypes.func.isRequired,
};
