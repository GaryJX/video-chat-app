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
  otherUserJoined: boolean
  name: string
  setUserStream: (stream: MediaStream | null) => void
  setRoomID: (roomID: string) => void
  setName: (name: string) => void
  setOtherUserJoined: (otherUserJoined: boolean) => void
}

const SocketContext = createContext<SocketContextType>({
  userStream: null,
  otherStream: null,
  otherUserJoined: false,
  name: '',
  setUserStream: () => {},
  setRoomID: () => {},
  setOtherUserJoined: () => {},
  setName: () => {},
})

const SocketProvider: React.FC = ({ children }) => {
  const [userStream, setUserStream] = useState<MediaStream | null>(null)
  const [otherStream, setOtherStream] = useState<MediaStream | null>(null) // TODO: This is just for testing
  const [otherUserJoined, setOtherUserJoined] = useState(false)
  const [roomID, setRoomID] = useState('')
  const [name, setName] = useState('') // TODO: Handle this logic properly
  const [otherStreams, setOtherStreams] = useState<MediaStream[]>([])

  const peer: Peer.Instance | null = useMemo(() => {
    if (process.browser) {
      return new Peer({
        initiator: true,
        trickle: false,
        stream: userStream || undefined,
      })
    } else {
      return null
    }
  }, [userStream])

  const memoizedValue = useMemo<SocketContextType>(() => {
    return {
      userStream,
      otherStream,
      otherUserJoined,
      name,
      setUserStream,
      setRoomID,
      setOtherUserJoined,
      setName,
    }
  }, [
    userStream,
    otherStream,
    otherUserJoined,
    name,
    setUserStream,
    setRoomID,
    setOtherUserJoined,
    setName,
  ])

  useEffect(() => {
    if (roomID && name && peer) {
      socket.emit('join-room', { roomID, name, signal: null })

      console.log('@@@ CALLED')
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
        if (signal) peer.signal(signal)
        setOtherUserJoined(true)
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
