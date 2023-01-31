import { useEffect, useState } from 'react';
import { logInWithEmailAndPassword } from '../firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import InputContainer from '../components/InputContainer';
import '../styles/LoginStyle.css';

export default function Login() {
  const { state } = useLocation();
  const previousRoute = state ? state.previousRoute : '/';
  const [ user, loading, error ] = useAuthState(auth);
  const [ emailValue, setEmailValue ] = useState('');
  const [ emailClassName, setEmailClassName ] = useState('');
  const [ emailErrorText, setEmailErrorText ] = useState(null);
  const [ passwordValue, setPasswordValue ] = useState('');
  const [ passwordClassName, setPasswordClassName ] = useState('');
  const [ passwordErrorText, setPasswordErrorText ] = useState(null);
  const [ showPassword, setShowPassword ] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) navigate(previousRoute);
  }, [ user, loading ]);

  function handleChange(e) {
    e.preventDefault();
    if (e.target.id === 'emailInput') setEmailValue(e.target.value);
    else if (e.target.id === 'passwordInput') setPasswordValue(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

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
      setPasswordErrorText('Enter your password');
      return;
    }
    else {
      setPasswordClassName('');
      setPasswordErrorText(null);
    }

    const response = await logInWithEmailAndPassword(emailValue, passwordValue);
    if (!response) return;

    if (response.includes('user-not-found')) {
      setEmailClassName('error');
      setEmailErrorText(response);
      return;
    }
    else {
      setEmailClassName('');
      setEmailErrorText(null);
    }

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
      {
        user || loading ?
          ''
          :
          <div id='loginFormContainer'>
            <h1>Log In</h1>
            <form id='loginForm' onSubmit={e => handleSubmit(e)}>
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
              <div className='inputContainer'>
                <label id='showPasswordToggle'>
                  Show/Hide Password
                  <input type='checkbox'
                    value={showPassword}
                    onClick={() => setShowPassword(!showPassword)}
                  ></input>
                </label>
              </div>
              <div className='inputContainer'>
                <input id='loginSubmit' type='submit' value='Log In'></input>
              </div>
            </form>
            <div>
              <Link to='/resetpassword'>Forgot your password?</Link>
              <br />
              <Link to='/register' state={{ previousRoute: previousRoute }}>Don't have an account? Register</Link>
            </div>
          </div>
      }
    </div>
  );
}