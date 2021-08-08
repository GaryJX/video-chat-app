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
      if (!videoOn) {
        videoRef!.srcObject = null
      }
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
      <div
        className="w-1/2 relative border-2 border-gray-200 dark:border-gray-500 bg-gray-50 dark:bg-gray-900"
        style={{ aspectRatio: '4 / 3', zIndex: 1 }}
      >
        <div
          className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center"
          style={{ zIndex: -1 }}
        >
          <div className="bg-gray-200 rounded-full w-20 h-20 flex items-center justify-center text-black font-semibold text-2xl dark:bg-gray-700 dark:text-white">
            GX
          </div>
        </div>
        <video
          playsInline
          muted
          ref={setVideoRef}
          autoPlay
          className="w-full"
        />
        <div className="absolute bottom-0 text-black bg-gray-200 dark:bg-gray-700 dark:text-white w-full px-3 py-1">
          Gary Xie
        </div>
      </div>
      {otherStream && (
        <div
          className="w-1/2 relative border-2 border-gray-200 dark:border-gray-500 bg-gray-50 dark:bg-gray-900"
          style={{ aspectRatio: '4 / 3', zIndex: 1 }}
        >
          <div
            className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center"
            style={{ zIndex: -1 }}
          >
            <div className="bg-gray-200 rounded-full w-20 h-20 flex items-center justify-center text-black font-semibold text-2xl dark:bg-gray-700 dark:text-white">
              GX
            </div>
          </div>
          <video
            playsInline
            ref={setOtherVideoRef}
            autoPlay
            className="w-full"
          />
          <div className="absolute bottom-0 text-black bg-gray-200 dark:bg-gray-700 dark:text-white w-full px-3 py-1">
            Gary Xie
          </div>
        </div>
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
