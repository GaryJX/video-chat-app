import React, { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { PuffLoader } from 'react-spinners'
import Button from '@/components/base/Button'
import TextInput from '@/components/base/TextInput'
import ThemeToggle from '@/components/common/ThemeToggle'
import styles from '@/styles/CreateOrJoinRoom.module.css'
import colors from 'tailwindcss/colors'
import { io } from 'socket.io-client'

// TODO: move this to a Context file
const socket = io('http://localhost:3001')

const CreateOrJoinRoom = () => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  useEffect(() => {
    socket.on('connection', () => {
      console.log('@ CONNECTED')
    })
  }, [])

  const handleCreateNewRoom = async () => {
    setLoading(true)
    return
    try {
      // TODO: Only request when the user tursn on camera and audio
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      console.log({ stream })
    } catch (err) {
      console.error({ err })
      toast({
        position: 'bottom-left',
        description: 'Please allow microphone and camera access ',
        status: 'error',
        isClosable: true,
      })
    }
  }

  const handleJoinRoom = async () => {}

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col p-10 shadow-md rounded-md w-3/4 max-w-sm bg-white dark:bg-gray-700 relative">
        <div className="absolute top-px right-px z-10">
          <ThemeToggle />
        </div>
        <div className={`flex flex-col ${loading ? 'invisible' : ''} `}>
          <div className="mx-auto mb-10 font-bold text-2xl">Video Chat App</div>
          <Button onClick={handleCreateNewRoom}>Create New Room</Button>
          <div className={styles.orDivider}>OR</div>
          <TextInput className="mb-5" placeholder="Enter room code" />
          <Button>Join Room</Button>
        </div>
        {loading && (
          <div className="absolute flex items-center justify-center left-0 top-0 w-full h-full">
            <PuffLoader color={colors.teal[500]} />
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateOrJoinRoom
