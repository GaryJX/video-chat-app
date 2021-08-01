import React, { useState } from 'react'
import { PuffLoader } from 'react-spinners'
import colors from 'tailwindcss/colors'

const VideoRoomPage: React.FC = () => {
  const [loading, setLoading] = useState(true)
  return loading ? (
    <div className="flex items-center justify-center h-screen">
      <PuffLoader color={colors.teal[500]} size={100} />
    </div>
  ) : (
    <div>HELLO WORLD</div>
  )
}

export default VideoRoomPage
