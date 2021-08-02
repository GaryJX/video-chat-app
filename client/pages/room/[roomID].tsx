import React, { useState, useEffect, useRef, useContext } from 'react'
import { useToast } from '@chakra-ui/react'
import { PuffLoader } from 'react-spinners'
import { SocketContext } from 'context/SocketContext'
import colors from 'tailwindcss/colors'
import { useRouter } from 'next/dist/client/router'

const VideoRoomPage: React.FC = () => {
  const { userStream, otherStream, setUserStream, setRoomID } =
    useContext(SocketContext)
  const [loading, setLoading] = useState(true)
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null)
  const [otherVideoRef, setOtherVideoRef] = useState<HTMLVideoElement | null>(
    null
  )
  const toast = useToast()
  const router = useRouter()
  const { roomID } = router.query as { roomID: string }

  useEffect(() => {
    getVideoAndAudioPermissions()
  }, [])

  useEffect(() => {
    if (router.isReady) {
      setRoomID(roomID)
    }
  }, [router])

  useEffect(() => {
    if (videoRef && userStream) {
      videoRef.srcObject = userStream
    }
  }, [videoRef, userStream])

  useEffect(() => {
    if (otherVideoRef && otherStream) {
      otherVideoRef.srcObject = otherStream
    }
  }, [otherVideoRef, otherStream])

  const getVideoAndAudioPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      setUserStream(stream)
      setLoading(false)
    } catch (err) {
      toast({
        position: 'bottom-left',
        description: 'Please grant microphone and camera access',
        status: 'error',
        isClosable: true,
      })
    }
  }

  return loading ? (
    <div className="flex items-center justify-center h-screen">
      <PuffLoader color={colors.teal[500]} size={100} />
    </div>
  ) : (
    <div className="h-screen p-10">
      <video playsInline muted ref={setVideoRef} autoPlay className="w-50" />
      <video
        playsInline
        muted
        ref={setOtherVideoRef}
        autoPlay
        className="w-50"
      />
    </div>
  )
}

export default VideoRoomPage
