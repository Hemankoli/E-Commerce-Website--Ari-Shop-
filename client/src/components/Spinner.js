import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Spinner = ({path = 'login'}) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue)
    }, 1000);
    count === 0 && navigate(`/${path}`)
    return () => clearInterval(interval)
  }, [count, navigate, path]) 

  return (
    <div className="flex flex-col space-y-2  items-center h-96 justify-center">
      <h1 className='text-center text-2xl text-purple-500'>Please Login or Register First</h1>
        <p className='text-center text-xl'>Redirecting to you in {count} seconds </p>
      <div className="w-8 h-8 border-4 ml-2 border-purple-500 border-t-transparent border-solid rounded-full animate-spin">
      </div>
    </div>
  );
};

export default Spinner;
