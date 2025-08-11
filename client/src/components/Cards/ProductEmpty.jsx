import React from 'react'
import { FaSpinner } from 'react-icons/fa6'

export default function ProductEmpty({key}) {
    return (
        <div key={key}
            className='relative flex flex-col w-[220px] md:w-[320px] lg:w-[220px] h-[320px] md:h-[380px] bg-white hover:shadow-lg hover:scale-105 overflow-hidden transition-all duration-300'>
            <div className='relative h-48 md:h-60 w-full flex items-center justify-center cursor-pointer bg-slate-100 animate-pulse'>
                <FaSpinner className='w-full animate-spin' />
                <div className='absolute top-2 right-2'>
                    <button className='cursor-pointer w-full h-full bg-slate-200 animate-pulse p-4 rounded-full'>
                    </button>
                </div>
            </div>

            <div className='flex flex-col mx-2 mt-4 flex-grow'>
                <p className='text-md text-gray-800 line-clamp-2 bg-slate-200 animate-pulse p-2 mb-2 rounded-full'></p>
                <p className='text-md text-gray-800 line-clamp-2 bg-slate-200 animate-pulse p-2 rounded-full'></p>
                <div className='flex flex-row gap-4 mt-4'>
                    <p className='text-gray-500 text-md font-sans mt-auto bg-slate-200 animate-pulse p-2 w-full rounded-full'></p>
                    <p className='text-gray-600 text-xs font-sans flex justify-center items-center line-through bg-slate-200 animate-pulse p-2 w-full rounded-full'></p>
                </div>
            </div>
        </div>
    )
}
