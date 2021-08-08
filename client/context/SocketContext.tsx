import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  useMemo,
} from 'react'
import { io } from 'socket.io-client'
import Peer from 'simple-peer'
import { useRouter } from 'next/dist/client/router'

// TODO: Use an environment variable for API URL
const socket = io('https://video-chat-app-api.herokuapp.com/')
// const socket = io('localhost:3001')

type SocketContextType = {
  userStream: MediaStream | null
  otherStream: MediaStream | null
  name: string
  setUserStream: (stream: MediaStream | null) => void
  setRoomID: (roomID: string) => void
  setName: (name: string) => void
}

const SocketContext = createContext<SocketContextType>({
  userStream: null,
  otherStream: null,
  name: '',
  setUserStream: () => {},
  setRoomID: () => {},
  setName: () => {},
})

const SocketProvider: React.FC = ({ children }) => {
  const [userStream, setUserStream] = useState<MediaStream | null>(null)
  const [roomID, setRoomID] = useState('')
  const [name, setName] = useState('') // TODO: Handle this logic properly
  const [otherStream, setOtherStream] = useState<MediaStream | null>(null) // TODO: This is just for testing
  const [otherStreams, setOtherStreams] = useState<MediaStream[]>([])

  const peer: Peer.Instance | null = useMemo(() => {
    if (userStream) {
      return new Peer({
        initiator: true,
        trickle: false,
        stream: userStream,
      })
    } else {
      return null
    }
  }, [userStream])

  const memoizedValue = useMemo<SocketContextType>(() => {
    return {
      userStream,
      otherStream,
      name,
      setUserStream,
      setRoomID,
      setName,
    }
  }, [userStream, otherStream, name, setUserStream, setRoomID, setName])

  useEffect(() => {
    if (userStream && roomID && name && peer) {
      peer.on('signal', (signal) => {
        console.log('@@@ SIGNAL PEER REACHED')
        console.log(signal)
        socket.emit('join-room', { roomID, name, signal })
        // socket.emit("")
      })

      peer.on('stream', (currentStream) => {
        console.log('@@@ STREAM PEER REACHED')
        setOtherStream(currentStream)
      })

      socket.on('user-connected', ({ name, signal }) => {
        console.log('@@@ USER CONNECTED')
        peer.signal(signal)
      })
    }
  }, [userStream, roomID, name, peer])

  return (
    <SocketContext.Provider value={memoizedValue}>
      {children}
    </SocketContext.Provider>
  )
}

export { SocketProvider, SocketContext }
