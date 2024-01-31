'use client'

import { Info } from './info'
import { Participants } from './participants'
import { Toolbar } from './toolbar'

export const Canvas = ({ boardId }: { boardId: string }) => {
  return (
    <main className="relative h-full w-full touch-none bg-neutral-100">
      <Info />
      <Participants />
      <Toolbar />
    </main>
  )
}
