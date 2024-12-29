import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../AuthContext';
import { postData } from '../../utils/apiUtils';
import { API_URLS } from '../../utils/apiRoutes';
import style from './index.module.scss'

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuthContext();

    const handleLogin = async (event: any) => {
        event.preventDefault();
      
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
        } catch (error) {
          // Handle errors, e.g., show an error message
        }
      };

    return (
        <div className={style.loginContainer}>
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
        </div>
    );
};

export default LoginPage;
