import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleLogin = () => {
        const userData = {
            email: email,
            password: password,
        };

        fetch('https://api.joeleprof.com/lets-play/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 400 ) {
                        throw new Error('Bad request :  des paramètres sont manquants ou invalides.');
                    } else if (response.status === 401 ) {
                        throw new Error('Unauthorized :  l\'adresse courrielle ou le mot de passe est incorrecte.');
                    } else {
                        throw new Error('Network response was not ok');
                    }
                }
                return response.json();
            })
            .then((data) => {
                localStorage.setItem('authToken', data.token);
                window.location.href = '/users';
            })
            .catch((error) => {
                // Login failed, display error message
                setErrorMessage(error.message);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-10">
                    <h2>Login</h2>
                    {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="d-flex justify-content-around w-100 my-4">
                            <button type="submit" className="btn btn-primary">
                                connexion
                            </button>
                            <a href="/registration" className="btn btn-success">
                                incrisption
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
