'use client'

import { RoomProvider } from '@/liveblocks.config'
import { ClientSideSuspense } from '@liveblocks/react'

interface RoomProps {
  roomId: string
  fallback: NonNullable<React.ReactNode> | null
}

export const Room = ({ children, roomId, fallback }: React.PropsWithChildren<RoomProps>) => {
  return (
    <RoomProvider id={roomId} initialPresence={{}}>
      <ClientSideSuspense fallback={fallback}>{() => children}</ClientSideSuspense>
    </RoomProvider>
  )
}
