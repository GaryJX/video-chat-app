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

  // const peer: Peer.Instance | null = useMemo(() => {
  //   if (process.browser) {
  //     return new Peer({
  //       initiator: true,
  //       trickle: false,
  //       stream: userStream || undefined,
  //     })
  //   } else {
  //     return null
  //   }
  // }, [])
  const peerRef = useRef<Peer.Instance>()

  // useEffect(() => {
  //   peerRef.current = new Peer({
  //     initiator: true,
  //     trickle: false,
  //     stream: userStream || undefined,
  //   })
  // }, [userStream])

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
    if (roomID && name) {
      socket.emit('join-room', { roomID, name })

      socket.on('user-connected', ({ name, userID }) => {
        console.log('@ Other User Joined', { name, userID })
        setOtherUserJoined(true)
      })

      socket.on('user-disconnected', (userID) => {
        setOtherUserJoined(false)
      })
    }
  }, [roomID, name])

  useEffect(() => {
    if (roomID && name) {
      peerRef.current = new Peer({
        initiator: true,
        trickle: false,
        stream: userStream || undefined,
      })
      // const peer = new Peer({
      //   initiator: true,
      //   trickle: false,
      //   stream: userStream || undefined,
      // })

      socket.on('peer-signal', (signal) => {
        console.log('@ Peer Signal REACHED')
        console.log({ signal })
        if (signal) {
          peerRef.current?.signal(signal)
        } else {
          setOtherStream(null)
        }
      })

      if (!userStream) {
        socket.emit('peer-signal', null)
      }

      peerRef.current?.on('signal', (signal) => {
        console.log('@@ SIGNAL PEER REACHED')
        socket.emit('peer-signal', signal)
      })

      peerRef.current?.on('stream', (stream) => {
        console.log('@@@ STREAM PEER REACHED')
        setOtherStream(stream)
      })

      return () => {
        console.log('@ Destroying peer')
      }
    }
  }, [roomID, name, userStream])

  // useEffect(() => {
  //   if (roomID && name && peer) {
  //     socket.emit('join-room', { roomID, name, signal: null })

  //     console.log('@@@ CALLED')
  //     peer.on('signal', (signal) => {
  //       console.log('@@@ SIGNAL PEER REACHED')
  //       console.log(signal)
  //       socket.emit('join-room', { roomID, name, signal })
  //       // socket.emit("")
  //     })

  //     peer.on('stream', (currentStream) => {
  //       console.log('@@@ STREAM PEER REACHED')
  //       setOtherStream(currentStream)
  //     })

  //     socket.on('user-connected', ({ name, signal }) => {
  //       console.log('@@@ USER CONNECTED')
  //       if (signal) peer.signal(signal)
  //       setOtherUserJoined(true)
  //     })
  //   }
  // }, [userStream, roomID, name, peer])

  return (
    <SocketContext.Provider value={memoizedValue}>
      {children}
    </SocketContext.Provider>
  )
}

export { SocketProvider, SocketContext }
