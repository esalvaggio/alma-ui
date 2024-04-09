import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../AuthContext';
import { postData } from '../../utils/apiUtils';
import { API_URLS } from '../../utils/apiRoutes';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuthContext();

    const handleRegister = async (event: any) => {
        event.preventDefault();

        const onSuccess = (data: any) => {
            localStorage.setItem('authToken', data.token);
            setIsAuthenticated(true);
            navigate('/');
        };

        try {
            await postData(
                API_URLS.REGISTER,
                {
                    username: username,
                    password: password,
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                },
                {},
                onSuccess
            );
        } catch (error) {
            // Handle errors, e.g., show an error message
        }
    };

    return (
        <div>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    required
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    required
                />
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
