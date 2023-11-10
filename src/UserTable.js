import React, { useState, useEffect } from 'react';
import './UserTable.css';
const UserTable = () => {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('authToken');

    useEffect(() => {
      fetchUsers();
    }, []);

    const fetchUsers = () => {
        fetch('https://api.joeleprof.com/lets-play/users', {
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
                setUsers(data.data);
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <div>
            <h2>User List</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                            <a className="btn btn-primary" href={`/user/${user.id}`}  >Details</a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
