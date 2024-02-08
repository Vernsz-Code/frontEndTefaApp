import React from 'react'

function NullPage({status}) {
  return (
    <div className='relative flex items-center justify-center h-[100vh]'>
        <span 
        style={{
            fontFamily: "poppins"
        }} 
        className='font-bold text-white font-sans text-3xl'>ERROR CODE : {status}</span>
    </div>
  )
}

export default NullPage