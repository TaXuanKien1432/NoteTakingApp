import React from 'react'

interface ConfirmationPopupProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel: string;
    cancelLabel: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationPopup = ({isOpen, title, message, confirmLabel, cancelLabel, onConfirm, onCancel}: ConfirmationPopupProps) => {
    if (!isOpen) return null;
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black/40 z-50'>
            <div className='bg-white rounded-lg shadow-lg w-80 p-5'>
                <h2 className='text-lg font-semibold mb-2 text-gray-800'>{title}</h2>
                <p className='text-sm text-gray-600 mb-5'>{message}</p>
                <div className='flex justify-end gap-3'>
                    <button 
                        onClick={onCancel}
                        className='px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100'
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={onConfirm}
                        className='px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700'
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationPopup