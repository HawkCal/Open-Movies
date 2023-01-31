import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { resetPassword } from '../firebase/auth';
import InputContainer from '../components/InputContainer';

export default function ResetPassword() {
  const location = useLocation();
  const [ emailValue, setEmailValue ] = useState('');
  const [ emailClassName, setEmailClassName ] = useState('');
  const [ emailErrorText, setEmailErrorText ] = useState(null);
  const [ isEmailSent, setIsEmailSent ] = useState(false);

  function handleChange(e) {
    if (e.target.id === 'emailInput') setEmailValue(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (emailValue.length === 0) {
      setEmailClassName('error');
      setEmailErrorText('Enter your email');
      return;
    }
    else {
      setEmailClassName('');
      setEmailErrorText(null);
    }

    const response = await resetPassword(emailValue);

    if (response.includes('user-not-found')) {
      setEmailClassName('error');
      setEmailErrorText(response);
      return;
    }
    else {
      setEmailClassName('');
      setEmailErrorText(null);
    }

    if (response && response.includes('email')) {
      setEmailClassName('error');
      setEmailErrorText(response);
    }
    else {
      setEmailErrorText('');
      setEmailClassName(null);
      setEmailValue('');
      setIsEmailSent(true);
    }
  }

  return (
    <div id='loginFormContainer'>
      <h1>Send Password Reset Email</h1>
      {
        isEmailSent ?
          <p>Password reset email has been sent</p>
          :
          <form id='loginForm' onSubmit={e => handleSubmit(e)}>
            <InputContainer
              type='text'
              id='emailInput'
              inputClassName={emailClassName}
              placeHolder='Email'
              handleChange={handleChange}
              errorText={emailErrorText}
            />
            <div className='inputContainer'>
              <input type='submit' id='loginSubmit' value='Send Email' />
            </div>
          </form>
      }
      <Link to='/login' state={{ previousRoute: location.pathname }}>Log in</Link>
    </div>
  );
}