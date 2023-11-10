import React, { useState } from 'react';
import './Registration.css';

const Registration = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email: email,
            password: password,
            username: username,
        };

        fetch('https://api.joeleprof.com/lets-play/auth/register', {
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
                    } else if (response.status === 409 ) {
                        throw new Error('Conflict :  l\'adresse courrielle est déjà utilisée par un autre utilisateur.');
                    } else {
                        throw new Error('Network response was not ok');
                    }
                }else{
                    if(response.status === 201){

                    }

                    window.location.href = '/login';

                }
                return response.json();
            })
            .then((data) => {
                window.alert('Registration successful!'); // Show the success message in an alert
                localStorage.setItem('authToken', data.token);
                window.location.href = '/users';
            })
            .catch((error) => {
                // Registration failed, display error message
                setErrorMessage(error.message);
            });
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-10">
                    <h2>Registration</h2>
                    {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
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
                                incrisption
                            </button>
                            <a href="/login" className="btn btn-success">
                                connexion
                            </a>
                        </div>

                    </form>
        </div>
    </div>
</div>
    );
};

export default Registration;
