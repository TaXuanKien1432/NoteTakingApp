import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import logo from '../assets/logo.png'
import { useLocation } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Auth:React.FC = () => {
  const isLogin = useLocation().pathname === "/login";

  const startGoogleOAuth = () => {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
  };

  const startGithubOAuth = () => {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/github`;
  };
  
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center'>
      <img src={logo} className='w-15'></img>
      {isLogin ? <LoginForm /> : <SignupForm />}
    </div>
  )
}

export default Auth