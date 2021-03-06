import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Control, Form } from 'react-redux-form';
import { compose } from 'redux';
import { isEmail } from 'validator';
import addStyle from '../../helpers/addStyle';
import { required } from '../../helpers/error';

class ForgottenPassword extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      error: '',
      success: false,
    };
  }

  handleSubmit(val) {
    const { firebase } = this.props;
    firebase.auth().sendPasswordResetEmail(val.email).then(() => {
      this.setState({
        success: true,
      });
    }).catch((err) => {
      this.setState({
        error: err.message,
      });
    });
  }

  render() {
    const { submitFailed, emailErrors } = this.props;

    const isError = this.state.error ||
      (submitFailed &&
       (emailErrors.required ||
        emailErrors.isEmail)
      );
    const firebaseErrorStyle = addStyle(this.state.error);
    const formErrorStyle = addStyle(isError);
    const emailRequiredErrorStyle = addStyle(submitFailed && emailErrors.isEmail);
    const isEmailErrorStyle = addStyle(submitFailed && isEmail);
    const isSuccessStyle = addStyle(this.state.success);

    return (
      <div className="forgotten-password">
        <h1>Forgotten Password</h1>

        <Form
          model="forgottenPassword"
          onSubmit={val => this.handleSubmit(val)}
          validators={{
            email: {
              required,
              isEmail,
            },
          }}
        >
          <div style={formErrorStyle}>
            <h2>Error</h2>
            <p>You have one or more errors below</p>
            <div style={firebaseErrorStyle}>{ this.state.error }</div>
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <Control type="email" model=".email" />
            <div style={emailRequiredErrorStyle}>An email is required</div>
            <div style={isEmailErrorStyle}>Please provide a valid email adddress</div>
          </div>

          <button>Submit</button>
        </Form>

        <div style={isSuccessStyle}>An email has been sent! :D</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  submitFailed: state.forms.forgottenPassword.$form.submitFailed,
  formErrors: state.forms.forgottenPassword.$form.errors,
  emailErrors: state.forms.forgottenPassword.email.errors,
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(ForgottenPassword);

