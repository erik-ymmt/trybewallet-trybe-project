import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { cancelEditor, editExpenseAction,
  fetchCurrencies,
  fetchCurrenciesExchange,
} from '../redux/actions';
import '../styles/Wallet.css';

const walletForm = 'wallet-form';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  componentDidUpdate() {
    const { savedValues, editor, idToEdit } = this.props;
    if (editor) {
      const description = document.getElementById('description');
      const value = document.getElementById('value');
      const currency = document.getElementById('currencies');
      const method = document.getElementById('method');
      const type = document.getElementById('type');

      description.value = savedValues(idToEdit).description;
      value.value = savedValues(idToEdit).value;
      currency.value = savedValues(idToEdit).currency;
      method.value = savedValues(idToEdit).method;
      type.value = savedValues(idToEdit).tag;
    }
  }

  getIdFromState = () => {
    const { getId } = this.props;
    return getId.length;
    // foi feito assim para seguir o proposto no projeto, porém isso gera um bug na edição;
  }

  saveFormValues = (event) => {
    const { dispatch } = this.props;
    event.preventDefault();
    const form = document.getElementById(walletForm);
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

  // referência new FormData: https://stackoverflow.com/questions/588263/how-can-i-get-all-a-forms-values-that-would-be-submitted-without-submitting

  editFormValues = (event) => {
    const { dispatch, idToEdit, exchangeRates } = this.props;
    event.preventDefault();
    const form = document.getElementById(walletForm);
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
    dispatch(editExpenseAction(formValues));
    form.reset();
  }

  cancelEditorClearForm = () => {
    const { dispatch } = this.props;
    dispatch(cancelEditor());
    const form = document.getElementById(walletForm);
    form.reset();
  }

  render() {
    const { currencies, editor } = this.props;
    return (
      <form id="wallet-form">
        <label htmlFor="description">
          <div>Descrição</div>
          <input
            type="text"
            data-testid="description-input"
            name="description"
            placeholder="Breve descrição da despesa"
            id="description"
          />
        </label>
        <label htmlFor="value">
          <div>Valor:</div>
          <input
            type="number"
            data-testid="value-input"
            name="value"
            placeholder="Valor na moeda utilizada"
            min="0"
            id="value"
          />
        </label>
        <label htmlFor="currencies">
          <div>Moeda de Conversão:</div>
          <select name="currency" id="currencies" data-testid="currency-input">
            {
              currencies.map((currency) => (
                <option key={ currency } value={ currency }>{currency}</option>))
            }
          </select>
        </label>
        <label htmlFor="method">
          <div>Método de Pagamento:</div>
          <select data-testid="method-input" name="method" id="method">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="type">
          <div>Tipo:</div>
          <select data-testid="tag-input" name="tag" id="type">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        { editor
          ? (
            <div>

              <button
                type="button"
                onClick={ this.editFormValues }
              >
                Editar despesa
              </button>
              <button
                type="button"
                onClick={ this.cancelEditorClearForm }
              >
                Cancelar
              </button>
            </div>
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
  savedValues: (id) => state.wallet.expenses
    .find((expense) => expense.id === id),
});

export default connect(mapStateToProps, null)(WalletForm);

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  getId: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  exchangeRates: PropTypes.func.isRequired,
  savedValues: PropTypes.func.isRequired,
};
