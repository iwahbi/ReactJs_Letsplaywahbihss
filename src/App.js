import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/cerulean/bootstrap.min.css';
import './styles.css';
import './EditUser.css';
import './Login.css';
import './Logout.css';
import './Nav.css';
import './Registration.css';
import './scoreManagement.css';
import './userProfil.css';
import './UserTable.css';
import Nav from "./Nav";
import UserTable from "./UserTable";
import EditUser from "./EditUser";
import UserProfil from "./userProfil";
import Logout from "./Logout";
import ScoreManagement from "./scoreManagement";
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // useNavigate hook to programmatically navigate based on isLoggedIn

    useEffect(() => {
        // Check if the authentication token is present in localStorage
        const authToken = localStorage.getItem('authToken');
        if(authToken){
            setIsLoggedIn(true);
        }
    }, []);


    return (
        <Router>
            <div>
                <Nav isLoggedIn={isLoggedIn} />

                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/edit-profile" element={<UserProfil />} />
                    <Route path={"/score"} element={<ScoreManagement />} />
                    <Route path="/users" element={<UserTable />} />
                    <Route path="/user/:id" element={<EditUser />} />
                    <Route exact path="/logout" element={<Logout />} />
                    <Route path="*" element={isLoggedIn ? <UserTable /> : <Login />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;