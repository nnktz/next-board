import { Loader } from 'lucide-react'
import { InfoSkelton } from './info'
import { ParticipantsSkeleton } from './participants'
import { ToolbarSkeleton } from './toolbar'

export const Loading = () => {
  return (
    <main className="relative flex h-full w-full touch-none items-center justify-center bg-neutral-100">
      <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
      <InfoSkelton />
      <ParticipantsSkeleton />
      <ToolbarSkeleton />
    </main>
  )
}
