import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='flex flex-col mx-auto tranform justify-center items-center my-28'>
        <h1 className='text-2xl md:text-4xl text-black animate-bounce font-bold'>404 Error</h1>
        <p className='text-lg md:text-xl font-medium'>Page not found</p>
        <button className='my-6'>
          <Link to="/" className='bg-red-400 p-2 rounded mx-auto text-white hover:bg-red-500'>Go back to home</Link>
        </button>
    </div>
  )
}

export default ErrorPage
