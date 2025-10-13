import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import logo from '../assets/logo.png'
import { Link, useLocation } from 'react-router-dom';
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
      {isLogin ? 
        <div className='w-100 flex items-center justify-center gap-x-1 mt-3'>
          <div>New user?</div>
          <Link to="/signup" className='text-jotpool hover:underline'>Sign up</Link>
        </div> :
        <div className='w-100 flex items-center justify-center gap-x-1 mt-3'>
          <div>Already have an account?</div>
          <Link to="/login" className='text-jotpool hover:underline'>Log in</Link>
        </div>}
      <div className='w-100 flex items-center justify-center my-6 space-x-2'>
        <div className='flex-grow border-t border-gray-300'></div>
        <div className='text-gray-400'>OR</div>
        <div className='flex-grow border-t border-gray-300'></div>
      </div>
        <div className='w-100 flex flex-col gap-y-3'>
          <button onClick={startGoogleOAuth} className='relative w-full px-3 py-2 flex justify-center items-center rounded-lg border border-gray-300 hover:bg-gray-100'>
            <FcGoogle className='text-xl absolute left-3'/>
            <div>Continue with Google</div>
          </button>
          <button onClick={startGithubOAuth} className='relative w-full px-3 py-2 flex justify-center items-center rounded-lg border border-gray-300 hover:bg-gray-100'>
            <FaGithub className='text-xl absolute left-3'/>
            <div>Continue with GitHub</div>
          </button>
        </div>
    </div>
  )
}

export default Auth