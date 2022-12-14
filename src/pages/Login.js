import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { userAction } from '../redux/actions';
import '../styles/Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isBtnDisabled: true,
      infoBox: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.loginBtnValidation());
  }

  infoBoxTimer = () => {
    setTimeout(() => this.setState({
      infoBox: '',
    }), 5000);
  }

  handleEmailInfoBox = () => {
    this.setState({
      infoBox: 'Digite um email válido. ex.: valido@valido.com',
    });
    this.infoBoxTimer();
  }

  handlePasswordInfoBox = () => {
    this.setState({
      infoBox: 'Digite uma senha com 6 ou mais caracteres. ex.: 123456',
    });
    this.infoBoxTimer();
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
    const { email, password, isBtnDisabled, infoBox } = this.state;
    return (
      <div className="login-page">
        <section className="login-container">
          <h2>Trybewallet</h2>
          <div className="input-container">
            <input
              type="email"
              value={ email }
              name="email"
              onChange={ this.handleChange }
              placeholder="email"
              data-testid="email-input"
            />
            <span
              className="info"
              title="Digite um email válido. ex.: valido@valido.com"
              onClick={ this.handleEmailInfoBox }
            >
              <AiOutlineQuestionCircle />
            </span>
          </div>
          <div className="input-container">
            <input
              type="password"
              value={ password }
              name="password"
              onChange={ this.handleChange }
              data-testid="password-input"
              placeholder="senha"
            />
            <span
              className="info"
              title="Digite uma senha com 6 ou mais caracteres. ex.: 123456"
              onClick={ this.handlePasswordInfoBox }
            >
              <AiOutlineQuestionCircle />
            </span>
          </div>
          <button
            type="button"
            disabled={ isBtnDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
          <p className="infoBox">{infoBox}</p>
        </section>
      </div>);
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
