import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { PuffLoader } from 'react-spinners'
import Container from '@/components/base/Container'
import Button from '@/components/base/Button'
import TextInput from '@/components/base/TextInput'
import ThemeToggle from '@/components/common/ThemeToggle'
import styles from '@/styles/CreateOrJoinRoom.module.css'
import colors from 'tailwindcss/colors'
import { useContext } from 'react'
import { SocketContext } from 'context/SocketContext'
import { useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'
import { FiClipboard } from 'react-icons/fi'

type CreateOrJoinRoomProps = {
  roomID?: string
}

const CreateOrJoinRoom: React.FC<CreateOrJoinRoomProps> = ({ roomID }) => {
  // const { generateNewRoom } = useContext(SocketContext)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const toast = useToast()

  // useEffect(() => {
  //   if (roomID) {
  //     setLoading(false)
  //     router.push(`/${roomID}`)
  //     // TODO: Redirect to another page
  //   }
  // }, [roomID])

  const handleCreateNewRoom = async () => {
    setLoading(true)
    // generateNewRoom()

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

  const copyToClipboard = () => {
    toast({
      position: 'bottom-left',
      description: 'Copied Room ID to clipboard',
      status: 'success',
      duration: 2500,
    })
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Container>
        <div className="absolute top-px right-px z-10">
          <ThemeToggle />
        </div>
        {!roomID && (
          <div className={`flex flex-col ${loading ? 'invisible' : ''} `}>
            <div className="mx-auto mb-10 font-bold text-2xl">
              Video Chat App
            </div>
            <Button onClick={handleCreateNewRoom}>Create New Room</Button>
            <div className={styles.orDivider}>OR</div>
            <TextInput className="mb-5" placeholder="Enter room code" />
            <Button>Join Room</Button>
          </div>
        )}
        {roomID && (
          <div className="flex flex-col">
            <label htmlFor="room-id" className="font-bold mb-2">
              Room ID
            </label>
            <div className="relative mb-5">
              <TextInput
                id="room-id"
                value={roomID}
                disabled
                className="w-full"
              />
              <button
                className="has-tooltip absolute right-px top-px p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded bg-gray-100 text-teal-600 hover:bg-gray-200"
                aria-label="Copy to clipboard"
                onClick={copyToClipboard}
              >
                <span className="tooltip rounded shadow-lg px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-black whitespace-nowrap -top-9 transform -translate-x-1/2">
                  Copy to Clipboard
                </span>
                <FiClipboard />
              </button>
            </div>
            <Button>Join Room</Button>
          </div>
        )}
        {loading && (
          <div className="absolute flex items-center justify-center left-0 top-0 w-full h-full">
            <PuffLoader color={colors.teal[500]} />
          </div>
        )}
      </Container>
    </div>
  )
}

export default CreateOrJoinRoom
