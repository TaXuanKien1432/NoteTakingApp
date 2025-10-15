import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { register } from '../services/auth';
import Popup from './Popup';

const SignupForm:React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      if (password != confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      try {
        const user = await register(name, email, password);
        navigate("/home");
      } catch (err: any) {
        console.log(err);
        setError(err.message || "Something went wrong. Please try again.");
      }
    };
  
    return (
    <div className="flex flex-col justify-center items-center">
        <div className='mb-3 font-bold text-lg'>Create your JotPool account</div>
        {error && <Popup message={error} color={"red"} onClose={() => setError(null)} />}
        <form onSubmit={handleSignup} className='w-100 flex flex-col space-y-3'>
            <input 
                type="text"
                placeholder='Full name'
                className='w-full border rounded-lg px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-jotpool focus:border-transparent'
                required
                onChange={(e) => setName(e.target.value)}
            />
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
            <input 
                type="password"
                placeholder='Confirm Password'
                className='w-full border rounded-lg px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-jotpool focus:border-transparent'
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className='px-3 py-2 font-medium text-white bg-jotpool rounded-lg hover:bg-blue-600'>Sign up</button>
        </form>
    </div>
  )
}

export default SignupForm