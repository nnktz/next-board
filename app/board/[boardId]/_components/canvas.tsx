'use client'

import { useState } from 'react'

import { CanvasMode, type CanvasState } from '@/types/canvas'
import { useCanRedo, useCanUndo, useHistory } from '@/liveblocks.config'

import { Info } from './info'
import { Participants } from './participants'
import { Toolbar } from './toolbar'

export const Canvas = ({ boardId }: { boardId: string }) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({ mode: CanvasMode.None })

  const history = useHistory()
  const canRedo = useCanRedo()
  const canUndo = useCanUndo()

  return (
    <main className="relative h-full w-full touch-none bg-neutral-100">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
    </main>
  )
}
