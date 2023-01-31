import { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';
import { registerUserWithEmailAndPassword } from '../firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import InputContainer from '../components/InputContainer';
import '../styles/LoginStyle.css';

export default function Register() {
  const { state } = useLocation();
  const { previousRoute } = state;
  const [ user, loading, error ] = useAuthState(auth);
  const [ emailValue, setEmailValue ] = useState('');
  const [ emailClassName, setEmailClassName ] = useState('');
  const [ emailErrorText, setEmailErrorText ] = useState(null);
  const [ userNameValue, setUserNameValue ] = useState('');
  const [ userNameClassName, setUserNameClassName ] = useState('');
  const [ userNameErrorText, setUserNameErrorText ] = useState(null);
  const [ passwordValue, setPasswordValue ] = useState('');
  const [ passwordConfirmValue, setPasswordConfirmValue ] = useState('');
  const [ passwordClassName, setPasswordClassName ] = useState('');
  const [ passwordErrorText, setPasswordErrorText ] = useState(null);
  const [ showPassword, setShowPassword ] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) navigate(previousRoute);
  }, [ user, loading ]);

  function handleChange(e) {
    let value = e.target.value.replace(/\s+/g, '');
    if (e.target.id === 'emailInput') setEmailValue(value);
    else if (e.target.id === 'passwordInput') setPasswordValue(value);
    else if (e.target.id === 'passwordConfirmInput') setPasswordConfirmValue(value);
    else if (e.target.id === 'userNameInput') setUserNameValue(value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (userNameValue.length === 0) {
      setUserNameClassName('error');
      setUserNameErrorText('Enter a username');
      return;
    }
    else {
      setUserNameClassName('');
      setUserNameErrorText(null);
    }

    if (emailValue.length === 0) {
      setEmailClassName('error');
      setEmailErrorText("Enter your email");
      return;
    }
    else {
      setEmailClassName('');
      setEmailErrorText(null);
    }

    if (passwordValue.length === 0) {
      setPasswordClassName('error');
      setPasswordErrorText('Enter a password');
      return;
    }
    else {
      setPasswordClassName('');
      setPasswordErrorText(null);
    }

    if (passwordValue !== passwordConfirmValue) {
      setPasswordClassName('error');
      setPasswordErrorText('Passwords do not match');
      return;
    }
    else {
      setPasswordClassName('');
      setPasswordErrorText(null);
    }

    const response = await registerUserWithEmailAndPassword(emailValue, passwordValue, userNameValue);
    if (!response) return;

    if (response.includes('email')) {
      setEmailClassName('error');
      setEmailErrorText(response);
    }
    else {
      setEmailClassName('');
      setEmailErrorText(null);
    }

    if (response.includes('password')) {
      setPasswordClassName('error');
      setPasswordErrorText(response);
    }
    else {
      setPasswordClassName('');
      setPasswordErrorText(null);
    }
  }

  return (
    <div>
      {user || loading ?
        ''
        :
        <div id='loginFormContainer'>
          <h1>Register</h1>
          <form id='loginForm' onSubmit={e => handleSubmit(e)}>
            <InputContainer
              type='text'
              id='userNameInput'
              inputClassName={userNameClassName}
              placeHolder='Username'
              value={userNameValue}
              handleChange={handleChange}
              errorText={userNameErrorText}
            />
            <InputContainer
              type='text'
              id='emailInput'
              inputClassName={emailClassName}
              placeHolder='Email'
              value={emailValue}
              handleChange={handleChange}
              errorText={emailErrorText}
            />
            <InputContainer
              type={showPassword ? 'text' : 'password'}
              id='passwordInput'
              inputClassName={passwordClassName}
              placeHolder='Password'
              value={passwordValue}
              handleChange={handleChange}
              errorText={passwordErrorText}
            />
            <InputContainer
              type={showPassword ? 'text' : 'password'}
              id='passwordConfirmInput'
              inputClassName={passwordClassName}
              placeHolder='Confirm Password'
              value={passwordConfirmValue}
              handleChange={handleChange}
              errorText={passwordErrorText}
            />
            <div className='inputContainer'>
              <label id='showPasswordToggle'>
                Show/Hide Password
                <input type='checkbox'
                  value={showPassword}
                  onClick={() => setShowPassword(!showPassword)} >
                </input>
              </label>
            </div>
            <div className='inputContainer'>
              <input type='submit' id='loginSubmit' value='Register'></input>
            </div>
          </form>
          <Link to='/Open-Movies/login' state={{ previousRoute: previousRoute }}>Already have an account? Log in</Link>
        </div>
      }
    </div>
  );
}