import React from 'react'
import { useRouter } from 'next/dist/client/router'
import CreateOrJoinRoom from '@/components/CreateOrJoinRoom'

const RoomPage: React.FC = () => {
  const router = useRouter()
  const { roomID } = router.query as { roomID: string }

  return router.isReady ? <CreateOrJoinRoom roomID={roomID} /> : null
}

export default RoomPage
