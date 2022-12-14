import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { activateEditionAction, removeExpenseAction } from '../redux/actions';
import '../styles/WalletTable.css';

class Table extends Component {
  render() {
    const { expenses, dispatch } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Moeda de conversão</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Método de pagamento</th>
            <th>Tag</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense) => {
            const {
              id, description, tag, method, value, currency, exchangeRates,
            } = expense;
            return (
              <tr key={ id }>
                <td>{description}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>Real</td>
                <td>{exchangeRates[currency].name}</td>
                <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>
                  {(Number(value) * Number(exchangeRates[currency].ask)).toFixed(2)}
                </td>
                <td>{method}</td>
                <td>{tag}</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => dispatch(activateEditionAction(id)) }
                  >
                    Editar

                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => dispatch(removeExpenseAction(id)) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};
