import React from 'react'
import Sidepanel from '../Sidepanel'

interface AboutProps {
    setSelected:  React.Dispatch<React.SetStateAction<"home" | "create">>
}
const About: React.FC<AboutProps> = ({setSelected}) => {
  return (
    <>
    <Sidepanel setSelected={setSelected}/>
    <div className='bg-bookends-primary'>About</div>
    </>
  )
}

export default About