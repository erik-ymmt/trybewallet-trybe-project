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
    return 0;
  }
  // return expenses.reduce((acc, cur) => cur.value + acc);
  return 1;
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
