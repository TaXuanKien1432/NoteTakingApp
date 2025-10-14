import React, { useState } from 'react'

const LoginForm:React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <div className="flex flex-col justify-center items-center">
        <div className='mb-3 font-bold text-lg'>Login to your JotPool account</div>
        <form className='w-100 flex flex-col space-y-3'>
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