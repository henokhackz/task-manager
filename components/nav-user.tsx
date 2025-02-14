import Image from 'next/image'
import React from 'react'

const NavUser = () => {
  return (
    <div className='w-full'>
      <Image src={'/logo.png'} height={50} width={200} alt="Task Manager"/>
      
    </div>
  )
}

export { NavUser}
