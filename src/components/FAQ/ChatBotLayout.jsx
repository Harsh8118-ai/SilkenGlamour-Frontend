import React from 'react'
import ChatBox from './ChatBox'


export default function ChatBotLayout() {
  return (
    <><div className='bg-MainBGColorYellow h-full lg:-mb-18 flex justify-center'>
        <div className='p-2 pt-4'>
    <ChatBox />
    </div>
    </div>
    </>
  )
}
