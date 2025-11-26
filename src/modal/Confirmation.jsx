import React from 'react'

const Confirmation = ({ onConfirm, onCancel, modalId, message }) => {
    return (
        <div className='p-4 flex flex-col items-center justify-center space-y-6'>
            <div className='text-center text-lg font-medium text-gray-700'>{message}</div>
            <div className='flex gap-4 justify-center w-full'>
                <button onClick={() => onConfirm(modalId)} className='px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-800'>Evet</button>
                <button onClick={() => onCancel(modalId)} className='px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-500'>Hayır</button>
            </div>

        </div>

    )
}

export default Confirmation