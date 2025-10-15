import React, { useState } from 'react'
import { login } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import Popup from './Popup';

const LoginForm:React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const user = await login(email, password);
      navigate("/home");
    } catch (err: any) {
      console.log(err);
      setError(err.message || "Something went wrong. Please try again.");
    }
  }
  
  return (
    <div className="flex flex-col justify-center items-center">
        <div className='mb-3 font-bold text-lg'>Login to your JotPool account</div>
        {error && <Popup message={error} color="red" onClose={() => setError(null)} />}
        <form onSubmit={handleLogin} className='w-100 flex flex-col space-y-3'>
            <input
                type="email"
                placeholder='Email'
                className='w-full border rounded-lg px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-jotpool focus:border-transparent'
                required
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="password"
                placeholder='Password'
                className='w-full border rounded-lg px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-jotpool focus:border-transparent'
                required
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className='px-3 py-2 font-medium text-white bg-jotpool rounded-lg hover:bg-blue-600'>Log in</button>
        </form>
    </div>
  )
}

export default LoginForm