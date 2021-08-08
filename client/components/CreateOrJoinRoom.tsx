import React, { FormEvent, useContext, useState } from 'react'
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
import { SocketContext } from 'context/SocketContext'

type CreateOrJoinRoomProps = {
  roomID?: string
}

const CreateOrJoinRoom: React.FC<CreateOrJoinRoomProps> = ({ roomID }) => {
  const [roomIDInput, setRoomIDInput] = useState('')
  const [nameInput, setNameInput] = useState('')
  const { setName } = useContext(SocketContext)
  const router = useRouter()
  const toast = useToast()

  const createNewRoom = () => {
    const newRoomID = uuid().slice(0, 7).toUpperCase()
    router.push(`/room/${newRoomID}`)
  }

  const joinRoomFromHome = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (roomIDInput && nameInput) {
      setName(nameInput)
      router.push(`/room/${roomIDInput}`)
    } else {
      toast({
        position: 'bottom-left',
        description: 'Please enter a Room ID and User Name.',
        status: 'error',
      })
    }
  }

  const joinRoomFromRoomPage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (nameInput) {
      setName(nameInput)
    } else {
      toast({
        position: 'bottom-left',
        description: 'Please enter a User Name.',
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
            <form onSubmit={joinRoomFromHome} className="flex flex-col">
              <Button type="button" onClick={createNewRoom}>
                Create New Room
              </Button>
              <div className={styles.orDivider}>OR</div>
              <label htmlFor="user-name" className="font-bold mb-2">
                Room ID
              </label>
              <TextInput
                className="mb-5"
                value={roomIDInput}
                onChange={(e) =>
                  setRoomIDInput((e.target as HTMLInputElement).value)
                }
              />
              <label htmlFor="user-name" className="font-bold mb-2">
                User Name
              </label>
              <TextInput
                id="user-name"
                name="user-name"
                value={nameInput}
                onChange={(e) =>
                  setNameInput((e.target as HTMLInputElement).value)
                }
                className="mb-5"
              />
              <Button type="submit">Join Room</Button>
            </form>
          )}
          {roomID && (
            <form onSubmit={joinRoomFromRoomPage}>
              <label htmlFor="room-id" className="font-bold mb-2">
                Room ID
              </label>
              <div className="relative mb-5">
                <TextInput
                  id="room-id"
                  name="room-id"
                  value={roomID}
                  disabled
                  className="w-full bg-gray-100"
                />
                <CopyToClipboard text={roomID}>
                  <button
                    className="has-tooltip absolute right-px top-px p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded bg-gray-200 text-teal-600 hover:bg-gray-300"
                    aria-label="Copy to clipboard"
                    type="button"
                    onClick={copyToClipboard}
                  >
                    <span className="tooltip rounded shadow-lg px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-black whitespace-nowrap -top-9 transform -translate-x-1/2">
                      Copy to Clipboard
                    </span>
                    <FiClipboard />
                  </button>
                </CopyToClipboard>
              </div>
              <label htmlFor="user-name" className="font-bold mb-2">
                User Name
              </label>
              <TextInput
                id="user-name"
                name="user-name"
                value={nameInput}
                onChange={(e) =>
                  setNameInput((e.target as HTMLInputElement).value)
                }
                className="w-full mb-5"
              />
              <Button type="submit" className="w-full">
                Join Room
              </Button>
            </form>
          )}
        </div>
      </Container>
    </div>
  )
}

export default CreateOrJoinRoom
