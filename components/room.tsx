'use client'

import { LiveList, LiveMap, LiveObject } from '@liveblocks/client'
import { ClientSideSuspense } from '@liveblocks/react'

import { RoomProvider } from '@/liveblocks.config'
import { type Layer } from '@/types/canvas'

interface RoomProps {
  roomId: string
  fallback: NonNullable<React.ReactNode> | null
}

export const Room = ({ children, roomId, fallback }: React.PropsWithChildren<RoomProps>) => {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{ cursor: null, selection: [] }}
      initialStorage={{
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList<string>(),
      }}
    >
      <ClientSideSuspense fallback={fallback}>{() => children}</ClientSideSuspense>
    </RoomProvider>
  )
}
