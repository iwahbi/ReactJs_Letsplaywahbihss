import React, { useState, useEffect } from 'react';
import './userProfil.css';
const UserProfil = () => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [score, setScore] = useState('');
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            fetchUserData(token);
        }
    }, []);

    const fetchUserData = (token) => {
        fetch('https://api.joeleprof.com/lets-play/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data.data);
                setUser(data.data); // Set the user data
                setUsername(data.data.username); // Set the username
                setEmail(data.data.email); // Set the email
                setScore(data.data.score); // Set the score
            })
            .catch((error) => console.error('Error fetching user data:', error));
    };

    const handleEdit = () => {
        fetch('https://api.joeleprof.com/lets-play/me', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: username,
            email: email,
          }),
        })
          .then((response) => {
            if (!response.ok) {
                if(response.status === 401){
                    throw new Error('You are not authorized to access this page');
                }else {
                    throw new Error('Network response was not ok');
                }
            }
            alert('User data updated successfully')
          })
          .catch((error) => alert('Error updating user data:', error));
    };

    const handleDelete = () => {
        //show a confirmation message
        if (!window.confirm('Are you sure you want to delete your account?')) {
            return;
        }

        fetch('https://api.joeleprof.com/lets-play/me', {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
                if (!response.ok) {
                    if(response.status === 401){
                        throw new Error('You are not authorized to access this page');
                    }else {
                        throw new Error('Network response was not ok');
                    }
                }
            }
            alert('User deleted successfully')
            // Remove the token from the local storage
            localStorage.removeItem('authToken');
            // Redirect the user to the login page
            window.location.href = '/login';
          })
          .catch((error) => alert('Error updating user data:', error));
    };

    const resetUserScore = () => {
        //show a confirmation message
        if (!window.confirm('Are you sure you want to reset your score?')) {
            return;
        }

        fetch('https://api.joeleprof.com/lets-play/me/reset-score', {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    if(response.status === 401){
                        throw new Error('You are not authorized to access this page');
                    }else {
                        throw new Error('Network response was not ok');
                    }
                }
                return response.json();
            })
            .then((data) => {
                // Handle success: Show a success alert or do any other actions if needed
                alert('User score has been reset.');
                // Update the user data
                setScore(0);
            })
            .catch((error) => {
                // Handle errors: Show an error alert or do any other actions if needed
                alert(`Error resetting user score: ${error.message}`);
            });
    };


    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">User Information</h5>
                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="score" className="form-label">
                            Score
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="score"
                            value={score}
                            disabled
                        />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={handleEdit}>
                        Edit
                    </button>
                    <button type="button" className="btn btn-danger ms-2" onClick={handleDelete}>
                        Delete
                    </button>
                    <button type="button" className="btn btn-warning ms-2" onClick={resetUserScore}>
                        Reset Score
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserProfil;
