import React from 'react'
import { useRouter } from 'next/dist/client/router'
import CreateOrJoinRoom from '@/components/CreateOrJoinRoom'
import { useContext } from 'react'
import { SocketContext } from 'context/SocketContext'
import VideoChatRoom from '@/components/VideoChatRoom'

const RoomPage: React.FC = () => {
  const router = useRouter()
  const { name } = useContext(SocketContext)
  const { roomID } = router.query as { roomID: string }

  if (!router.isReady) return null

  if (name) return <VideoChatRoom />
  return <CreateOrJoinRoom roomID={roomID} />
}

export default RoomPage
