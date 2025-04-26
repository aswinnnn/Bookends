import React from 'react'
import Sidepanel from '../Sidepanel'

interface SettingsProps {
    setSelected:  React.Dispatch<React.SetStateAction<"home" | "create">>
}
const Settings: React.FC<SettingsProps> = ({setSelected}) => {
  return (
    <>
    <Sidepanel setSelected={setSelected}/>
    <div className='bg-bookends-primary'>Settings</div>
    </>
  )
}

export default Settings