import React from 'react'
import { MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Context';
export default function Messagebtn() {

    const navigate = useNavigate();
    const {token}=useAuth();

    if(!token){
        return null;
    }

  return (
    <div className='fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition-colors ' onClick={() => navigate('/club/chat')}>
        <MessageCircle />
    </div>
  )
}
