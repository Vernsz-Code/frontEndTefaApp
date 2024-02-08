import React from 'react'
import { motion } from 'framer-motion'
import {useTypewriter, Cursor} from 'react-simple-typewriter'
function Wellcome({CurrentUser}) {
    const [textWellcome] = useTypewriter({
        words: [`Hi ${CurrentUser}, this app on beta test`],
        typeSpeed: 60,
    })
  return (
    <div className='w-full h-[100%] text-white font-bold text-2xl flex justify-center items-center'>
        <motion.span
        initial={{
            opacity: 0,
            x:300
        }}
        animate={{
            opacity: 1,
            x: 0,
        }}
        transition={{
            duration: 0.5
        }}
        >
            {textWellcome}
        </motion.span>
        <Cursor cursorStyle="|" cursorColor='white'/>
        </div>
  )
}

export default Wellcome