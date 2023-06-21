import React, { useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[token,setToken]=useState('')
  const navigate=useNavigate()

  if(token){
    localStorage.setItem('token',token)
  }

  const handleSignup = () => {
    axios
      .post('http://localhost:3000/signup', { name,email, password })
      .then((response) => {
        const { token } = response.data;
        console.log(token)
        setToken(token)
        // Store the token in local storage or cookies
        // Perform any necessary actions after successful signup
      })
      .catch((error) => {
        console.error(error);
        // Handle signup error
      });
  };

  const handleLogin = () => {
    axios
      .post('http://localhost:3000/login', { email, password })
      .then((response) => {
        
        const { token } = response.data;
        console.log(response.data);
        const userId = response.data.userId; // Replace `response.data.userId` with the actual response data containing the user ID
        localStorage.setItem("userId", userId); 
        setToken(token)
        // Store the token in local storage or cookies
        // Perform any necessary actions after successful login
      })
      .catch((error) => {
        console.error(error);
        // Handle login error
      });
  };
   const onClickHandler=()=>{
   navigate('/')
   }

  return (
    <div>
      <h1>LoginPage</h1>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Email:</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
      <button onClick={handleLogin}>Log In</button>
      {token && <button onClick={onClickHandler} >Booking Appointment</button>}
    </div>
  );
}
