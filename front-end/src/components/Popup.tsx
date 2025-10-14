import React from 'react'

type PopupColor = "red" | "green" | "blue" | "yellow";

interface PopupProps {
  message: string;
  color: PopupColor;
  onClose: () => void;
}

const colorMap: Record<PopupColor, string> = {
  red:    "bg-red-100 text-red-700 border-red-300",
  green:  "bg-green-100 text-green-700 border-green-300",
  blue:   "bg-blue-100 text-blue-700 border-blue-300",
  yellow: "bg-yellow-100 text-yellow-700 border-yellow-300",
};

const Popup:React.FC<PopupProps> = ({message, color, onClose}) => {
  return (
    <div className='fixed inset-0 bg-black/30 flex justify-center items-center z-[100]'>
        <div className={`min-w-[300px] border rounded-lg shadow-lg px-6 py-5 flex flex-col items-center gap-y-4 ${colorMap[color]}`}>
            <div className='font-medium text-center'>{message}</div>
            <button className='px-4 py-2 rounded-md bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 font-medium' onClick={onClose}>Close</button>
        </div>
    </div>
  )
}

export default Popup