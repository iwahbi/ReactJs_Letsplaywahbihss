import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import './EditUser.css';

const EditUser = () => {

    const { id } = useParams();
    // Implement edit user functionality here
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(''); // Set initial value as an empty string
    const [email, setEmail] = useState(''); // Set initial value as an empty string


    const token = localStorage.getItem('authToken');


    useEffect(() => {
       fetchUsers(token, id);
    }, []);

    const fetchUsers = () => {
        fetch('https://api.joeleprof.com/lets-play/users', {
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
                // Find the user with the matching id
                const userById = data.data.find((user) => user.id === +id);
                setUser(userById);
                setUsername(userById.username); // Set the username
                setEmail(userById.email); // Set the email
            })
            .catch((error) => console.error('Error fetching users:', error));
    };



    const handleEdit = () => {
        const newData = {
            username: username,
            email: email,
        };

        const token = localStorage.getItem('authToken');

        fetch(`https://api.joeleprof.com/lets-play/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newData),
        })
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error('Unauthorized: You are not authenticated or do not have admin access.');
                    } else if (response.status === 404) {
                        throw new Error('Not Found: The specified user does not exist.');
                    } else if (response.status === 409) {
                        throw new Error('Conflict: The email is already used by another user.');
                    } else {
                        throw new Error('Network response was not ok');
                    }
                }
                return response.json();
            })
            .then((data) => {
                // Handle success: Show a success alert or do any other actions if needed
                alert('User information updated successfully.');
            })
            .catch((error) => {
                // Handle errors: Show an error alert or do any other actions if needed
                alert(`Error updating user information: ${error.message}`);
            });
    };


    const handleDelete = () => {
        //show a confirmation message
        if (!window.confirm('Are you sure you want to delete this user?')) {
            return;
        }

        fetch(`https://api.joeleprof.com/lets-play/users/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error('Unauthorized: You are not authenticated or do not have admin access.');
                    } else if (response.status === 404) {
                        throw new Error('Not Found: The specified user does not exist.');
                    } else {
                        throw new Error('Network response was not ok');
                    }
                }
                return response.json();
            })
            .then((data) => {
                // Handle success: Show a success alert or do any other actions if needed
                alert('User deleted successfully.');
            })
            .catch((error) => {
                // Handle errors: Show an error alert or do any other actions if needed
                alert(`Error deleting user: ${error.message}`);
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
                    <button type="button" className="btn btn-primary" onClick={handleEdit}>
                        Edit
                    </button>
                    <button type="button" className="btn btn-danger ms-2" onClick={handleDelete}>
                        Delete
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditUser;
