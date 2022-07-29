import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userAction } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isBtnDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.loginBtnValidation());
  }

  emailValidation = () => {
    const { email } = this.state;
    const validEmailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    // referência regex: https://regexr.com/3e48o
    return email.match(validEmailRegex);
  }

  passwordValidation = () => {
    const { password } = this.state;
    const minLength = 6;
    if (password.length >= minLength) {
      return true;
    }
    return false;
  }

  loginBtnValidation = () => {
    if (this.emailValidation() && this.passwordValidation()) {
      this.setState({
        isBtnDisabled: false,
      });
    } else {
      this.setState({
        isBtnDisabled: true,
      });
    }
  }

  handleClick = () => {
    const { email } = this.state;
    const { history, userEmail } = this.props;
    userEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, isBtnDisabled } = this.state;
    return (
      <section>
        <h2>Trybewallet</h2>
        <input
          type="email"
          value={ email }
          name="email"
          onChange={ this.handleChange }
          placeholder="email"
          data-testid="email-input"
        />
        <input
          type="password"
          value={ password }
          name="password"
          onChange={ this.handleChange }
          data-testid="password-input"
          placeholder="senha"
        />
        <button
          type="button"
          disabled={ isBtnDisabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </section>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  userEmail: (email) => dispatch(userAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  userEmail: PropTypes.func.isRequired,
};
