import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Header.css';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    const { email, totalExpenses } = this.props;
    return (
      <header>
        <Link to="/">
          <h3 className="title">Trybewallet</h3>
        </Link>
        <section>
          <div className="emailContainer">
            <span>
              Email:
              {' '}
            </span>
            <span data-testid="email-field">
              {email === ''
                ? <Link to="/"><span className="link">Faça o Login</span></Link>
                : email}
            </span>
          </div>
          <div>
            <span>
              Despesas Totais:
              {' '}
            </span>
            <span data-testid="total-field" className="total-expenses">
              {totalExpenses()}
            </span>
            <span>{'  '}</span>
            <span data-testid="header-currency-field">
              BRL
            </span>
          </div>
        </section>

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
