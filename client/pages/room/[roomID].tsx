import React, { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { PuffLoader } from 'react-spinners'
import colors from 'tailwindcss/colors'

const VideoRoomPage: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    getVideoAndAudioPermissions()
  }, [])

  const getVideoAndAudioPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
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
    <div className="h-screen">HELLO WORLD</div>
  )
}

export default VideoRoomPage
