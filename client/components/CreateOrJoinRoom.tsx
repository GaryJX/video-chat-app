import React from 'react'
import Button from '@/components/base/Button'
import TextInput from '@/components/base/TextInput'
import styles from '@/styles/CreateOrJoinRoom.module.css'
import ThemeToggle from '@/components/common/ThemeToggle'

const CreateOrJoinRoom = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col p-10 shadow-md rounded-md w-3/4 max-w-sm bg-white dark:bg-gray-700">
        <div className="mx-auto mb-5 font-bold text-2xl">Video Chat App</div>
        <ThemeToggle />
        <Button>Create Room</Button>
        <div className={styles.orDivider}>OR</div>
        <TextInput className="mb-5" placeholder="Enter room code" />
        <Button>Join Room</Button>
      </div>
    </div>
  )
}

export default CreateOrJoinRoom
