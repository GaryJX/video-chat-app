import React, { useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import { useToast } from '@chakra-ui/react'
import { FiClipboard } from 'react-icons/fi'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { v4 as uuid } from 'uuid'
import Container from '@/components/base/Container'
import Button from '@/components/base/Button'
import TextInput from '@/components/base/TextInput'
import ThemeToggle from '@/components/common/ThemeToggle'
import styles from '@/styles/CreateOrJoinRoom.module.css'

type CreateOrJoinRoomProps = {
  roomID?: string
}

const CreateOrJoinRoom: React.FC<CreateOrJoinRoomProps> = ({ roomID }) => {
  const [input, setInput] = useState('')
  const router = useRouter()
  const toast = useToast()

  const createNewRoom = () => {
    const newRoomID = uuid().slice(0, 7).toUpperCase()
    router.push(`/${newRoomID}`)
  }

  const joinRoom = () => {
    if (input) {
      router.push(`/room/${input}`)
    } else {
      toast({
        position: 'bottom-left',
        description: 'Please enter a Room ID.',
        status: 'error',
      })
    }
  }

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
        <div className="flex flex-col">
          <div className="mx-auto mb-5 font-bold text-2xl">Video Chat App</div>
          {!roomID && (
            <>
              <Button onClick={createNewRoom}>Create New Room</Button>
              <div className={styles.orDivider}>OR</div>
              <TextInput
                className="mb-5"
                placeholder="Enter Room ID"
                value={input}
                onChange={(e) => setInput((e.target as any).value)}
              />
              <Button onClick={joinRoom}>Join Room</Button>
            </>
          )}
          {roomID && (
            <>
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
                <CopyToClipboard text={roomID}>
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
                </CopyToClipboard>
              </div>
              <Button onClick={() => router.push(`/room/${roomID}`)}>
                Join Room
              </Button>
            </>
          )}
        </div>
      </Container>
    </div>
  )
}

export default CreateOrJoinRoom
