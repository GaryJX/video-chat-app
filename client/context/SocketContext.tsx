import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  useMemo,
} from 'react'
import { io } from 'socket.io-client'

// TODO: Use an environment variable for API URL
const socket = io('http://localhost:3001')

type SocketContextType = {
  roomID: string | null
  generateNewRoom: () => void
}

const SocketContext = createContext<SocketContextType>({
  roomID: null,
  generateNewRoom: () => {},
})

const SocketProvider: React.FC = ({ children }) => {
  const [roomID, setRoomID] = useState<string | null>(null)
  const memoizedValue = useMemo<SocketContextType>(() => {
    return {
      roomID,
      generateNewRoom,
    }
  }, [roomID])

  useEffect(() => {
    socket.on('created-room-id', (roomID) => {
      setRoomID(roomID)
    })
  }, [])

  return (
    <SocketContext.Provider value={memoizedValue}>
      {children}
    </SocketContext.Provider>
  )
}

const generateNewRoom = () => {
  socket.emit('create-room')
}

export { SocketProvider, SocketContext }
