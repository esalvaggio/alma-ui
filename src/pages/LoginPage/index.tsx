import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../AuthContext';
import { postData } from '../../utils/apiUtils';
import { API_URLS } from '../../utils/apiRoutes';
import style from './index.module.scss'
import LogoUrl from '../../assets/logo.svg'

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuthContext();

  const handleLogin = async (event: any) => {
    event.preventDefault();
    setError('');

    const onSuccess = (data: any) => {
      localStorage.setItem('authToken', data.token);
      setIsAuthenticated(true);
      navigate('/home');
    };

    try {
      await postData(
        API_URLS.LOGIN,
        {
          username,
          password,
        },
        {},
        onSuccess
      );
    } catch (error: any) {
      if (error.status === 400) {
        setError("Invalid username or password");
      } else {
        setError('An error occured. Please try again')
      }
    }
  };

  return (
    <div className={style.loginContainer}>
      <img src={LogoUrl} width="60" height="60" alt="Alma Logo" />
      <div className={style.logoText}>
        Alma
      </div>
      <form className={style.submitContainer} onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          required
        />
        <button className={style.submitButton} type="submit">Login</button>
      </form>
      <div className={style.errorComponent}>
        {error && <div className={style.error}>This account does not exist.</div>}
      </div>
    </div>
  );
};

export default LoginPage;
