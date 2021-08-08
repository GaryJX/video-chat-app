import React, { useState, useEffect, useRef, useContext } from 'react'
import { useToast } from '@chakra-ui/react'
import { PuffLoader } from 'react-spinners'
import { SocketContext } from 'context/SocketContext'
import colors from 'tailwindcss/colors'
import { useRouter } from 'next/dist/client/router'
import VideoChatToolbar from '@/components/VideoChatToolbar'

const VideoChatRoom: React.FC = () => {
  const { userStream, otherStream, setUserStream, setRoomID } =
    useContext(SocketContext)
  const [loading, setLoading] = useState(false)
  const [videoOn, setVideoOn] = useState(false)
  const [audioOn, setAudioOn] = useState(false)
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null)
  const [otherVideoRef, setOtherVideoRef] = useState<HTMLVideoElement | null>(
    null
  )
  const toast = useToast()
  const router = useRouter()
  const { roomID } = router.query as { roomID: string }

  useEffect(() => {
    if (router.isReady) {
      setRoomID(roomID)
    }
  }, [router])

  useEffect(() => {
    if (otherVideoRef && otherStream) {
      otherVideoRef.srcObject = otherStream
    }
  }, [otherVideoRef, otherStream])

  useEffect(() => {
    updateVideoAndAudioPermissions()
  }, [audioOn, videoOn])

  const updateVideoAndAudioPermissions = async () => {
    if (userStream) {
      userStream.getTracks().forEach((track) => track.stop())
    }

    if (audioOn || videoOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: videoOn,
          audio: audioOn,
        })

        videoRef!.srcObject = stream
        setUserStream(stream)
        setLoading(false)
      } catch (err) {
        console.error(err)
        toast({
          position: 'bottom-left',
          description: 'Please grant microphone and camera access',
          status: 'error',
          isClosable: true,
        })
      }
    }
  }

  return loading ? (
    <div className="flex items-center justify-center h-screen">
      <PuffLoader color={colors.teal[500]} size={100} />
    </div>
  ) : (
    <div className="h-screen flex flex-row flex-wrap items-center justify-center p-10 pb-16">
      <video playsInline muted ref={setVideoRef} autoPlay className="w-1/2" />
      {otherStream && (
        <video playsInline ref={setOtherVideoRef} autoPlay className="w-1/2" />
      )}
      <VideoChatToolbar
        roomID={roomID}
        videoOn={videoOn}
        audioOn={audioOn}
        onToggleVideo={() => setVideoOn((on) => !on)}
        onToggleAudio={() => setAudioOn((on) => !on)}
      />
    </div>
  )
}

export default VideoChatRoom
