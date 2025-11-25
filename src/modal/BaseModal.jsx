import React from 'react'
//Tüm Modallar burayı kullanacaktır 
const BaseModal = ({ title, modalContent,onClose,id,extraProps  }) => {
    const ModalContent=modalContent
    const componentProps = extraProps || {};
    return (
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-xl w-full" >
            <div className='flex justify-end'><button onClick={onClose} className='px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-blue-700'>X</button></div>
            <div id='modal title' className='border-b border-amber-600 pb-3 mb-4'><h2 className='text-2xl font-bold text-gray-800'>{title}</h2></div>
            <div id='modal-content' className=' flex-1 overflow-auto'><ModalContent {...componentProps} modalId={id} /></div>
        </div>
    )
}

export default BaseModal