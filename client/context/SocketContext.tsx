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

const socket = io(process.env.NEXT_PUBLIC_SERVER_URL!)

type SocketContextType = {
  userStream: MediaStream | null
  otherStream: MediaStream | null
  otherUserJoined: boolean
  otherUserName: string
  name: string
  setUserStream: (stream: MediaStream | null) => void
  setRoomID: (roomID: string) => void
  setName: (name: string) => void
  setOtherUserJoined: (otherUserJoined: boolean) => void
  // joinCall: () => void
}

const SocketContext = createContext<SocketContextType>({
  userStream: null,
  otherStream: null,
  otherUserJoined: false,
  otherUserName: '',
  name: '',
  setUserStream: () => {},
  setRoomID: () => {},
  setOtherUserJoined: () => {},
  setName: () => {},
  // joinCall: () => {},
})

const SocketProvider: React.FC = ({ children }) => {
  const [userStream, setUserStream] = useState<MediaStream | null>(null)
  const [otherStream, setOtherStream] = useState<MediaStream | null>(null)
  const [otherUserJoined, setOtherUserJoined] = useState(false)
  const [otherUserName, setOtherUserName] = useState('')
  const [roomID, setRoomID] = useState('')
  const [name, setName] = useState('')
  const [otherStreams, setOtherStreams] = useState<MediaStream[]>([])
  // const [isInitiator, setIsInitiator] = useState(false)
  const isInitiator = useRef(false)

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
      otherUserName,
      name,
      setUserStream,
      setRoomID,
      setOtherUserJoined,
      setOtherUserName,
      setName,
      // joinCall,
    }
  }, [
    userStream,
    otherStream,
    otherUserJoined,
    otherUserName,
    name,
    setUserStream,
    setRoomID,
    setOtherUserJoined,
    setOtherUserName,
    setName,
  ])

  useEffect(() => {
    if (roomID && name && userStream) {
      socket.emit('join-room', { roomID, name })

      socket.on('is-initiator', (initiator: boolean) => {
        console.log('@ I AM INITIATOR')
        isInitiator.current = initiator
        joinPeer()
      })

      socket.on('user-connected', ({ name, userID }) => {
        console.log('@ Other User Joined', { name, userID })
        setOtherUserJoined(true)
        setOtherUserName(name)
      })

      socket.on('user-disconnected', (userID) => {
        setOtherUserJoined(false)
      })
    }
  }, [roomID, name, userStream])

  const joinPeer = () => {
    console.log({ isInitiator: isInitiator.current, userStream })

    const peer = new Peer({
      initiator: isInitiator.current,
      trickle: false,
      stream: userStream || undefined,
    })

    socket.on('peer-signal', (signal) => {
      console.log('@ Peer Signal REACHED')
      console.log({ signal })
      if (signal) {
        peer.signal(signal)
      } else {
        setOtherStream(null)
      }
    })

    if (!userStream) {
      socket.emit('peer-signal', null)
    }

    peer.on('signal', (signal) => {
      console.log('@@ SIGNAL PEER REACHED')
      socket.emit('peer-signal', signal)
    })

    peer.on('stream', (stream) => {
      console.log('@@@ STREAM PEER REACHED')
      setOtherStream(stream)
    })

    peerRef.current = peer
  }

  // useEffect(() => {
  //   if (roomID && name) {

  //     return () => {
  //       console.log('@ Destroying peer')
  //     }
  //   }
  // }, [roomID, name, userStream])

  // const joinCall = () => {
  //   const peer = new Peer({ initiator: false, trickle: false, stream });

  //   peer.on("signal", (data) => {
  //     socket.emit("answercall", { signal: data, to: call.from });
  //   });

  //   peer.on("stream", (currentStream) => {
  //     userVideo.current.srcObject = currentStream;
  //   });

  //   peer.signal(call.signal);

  //   connectionRef.current = peer;
  // }

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
