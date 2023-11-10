import React, {useEffect, useState} from 'react';
import './scoreManagement.css';
const ScoreManagement = () => {
    const [userScore, setUserScore] = useState(0);
    const [pointsToAdd, setPointsToAdd] = useState(1);
    const token = localStorage.getItem('authToken');


    useEffect(() => {
        fetchCurrentUserScore();
    }, []);


    const fetchCurrentUserScore = () => {
        // Fetch the user's current score
        fetch('https://api.joeleprof.com/lets-play/me', {
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
                setUserScore(data.data.score); // Set the user's current score
            })
            .catch((error) => alert(error.message));
    };




    const fetchIncrementCurrentUserScore = () => {
        // Call the API to increment the user's score
        fetch('https://api.joeleprof.com/lets-play/game/wins', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({}), // Empty object for the request body
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Update the user's score in the state after successful increment
                setUserScore(userScore + pointsToAdd);
            })
            .catch((error) => console.error('Error incrementing user score:', error));
    };

    const fetchDecrementCurrentUserScore = () => {
        // Call the API to decrement the user's score
        fetch('https://api.joeleprof.com/lets-play/game/lost', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({}), // Empty object for the request body
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Update the user's score in the state after successful decrement
                setUserScore(userScore - pointsToAdd);
            })
            .catch((error) => console.error('Error decrementing user score:', error));
    };


    const handleIncrement = () => {
        //use loop for to add pointsToAdd to userScore by pointsToAdd
        for (let i = 0; i < pointsToAdd; i++) {
            fetchIncrementCurrentUserScore();
        }
        setUserScore(userScore + pointsToAdd);
        setPointsToAdd(1);
    }

    const handleDecrement = () => {
        //use loop for to add pointsToAdd to userScore by pointsToAdd
        for (let i = 0; i < pointsToAdd; i++) {
            fetchDecrementCurrentUserScore();
        }
        setUserScore(userScore - pointsToAdd);
        setPointsToAdd(1);
    }

    return (
        <div className="container mt-4">
            <h2>Score Management</h2>
            <p>Current Score: {userScore}</p>
            <div className="mb-3">
                <label htmlFor="points" className='form-label'>Points to Add or Subtract:</label>
                <input
                    type="number"
                    min="0"
                    id="points"
                    value={pointsToAdd}
                    onChange={(e) => setPointsToAdd(parseInt(e.target.value, 10))}
                />
            </div>
            <button type="button" className="btn btn-success me-2" onClick={handleIncrement}>
                Add Points
            </button>
            <button type="button" className="btn btn-danger" onClick={handleDecrement}>
                Subtract Points
            </button>
        </div>
    );
};

export default ScoreManagement;
