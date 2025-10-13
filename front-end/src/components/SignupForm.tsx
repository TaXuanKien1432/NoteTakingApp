import React from 'react'

const SignupForm:React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center">
        <div className='mb-3 font-bold text-lg'>Create your JotPool account</div>
        <form className='w-100 flex flex-col space-y-3'>
            <input 
                type="text"
                placeholder='Full name'
                className='w-full border rounded-lg px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-jotpool focus:border-transparent'
                required
            />
            <input
                type="email"
                placeholder='Email'
                className='w-full border rounded-lg px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-jotpool focus:border-transparent'
                required
            />
            <input 
                type="password"
                placeholder='Password'
                className='w-full border rounded-lg px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-jotpool focus:border-transparent'
                required
            />
            <button className='px-3 py-2 font-medium text-white bg-jotpool rounded-lg hover:bg-blue-600'>Sign up</button>
        </form>
    </div>
  )
}

export default SignupForm