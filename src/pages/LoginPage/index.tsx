import React, { useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext'; // This is where you store your auth state

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setAuthData }: any = useContext(AuthContext); // Using context to set authentication data globally

    const handleLogin = async (event: any) => {
        event.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/api/user/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data,"logged in!")
            // Assuming the response contains a token
            setAuthData(data.token); // Persist this token securely
            // Redirect to a different page or do something else upon successful login
        } else {
            // Handle errors, e.g., show an error message
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
