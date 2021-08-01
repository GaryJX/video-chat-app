import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { useEffect } from 'react'

const RoomPage: React.FC = (props) => {
  const router = useRouter()
  useEffect(() => {
    if (router.isReady) {
      const { roomID } = router.query
      console.log({ roomID })
    }
  }, [router])
  return <div></div>
}

export default RoomPage
