'use client'

import { useCallback, useState } from 'react'

import { CanvasMode, type Camera, type CanvasState } from '@/types/canvas'
import { useCanRedo, useCanUndo, useHistory, useMutation } from '@/liveblocks.config'
import { pointerEventToCanvasPoint } from '@/lib/utils'

import { Info } from './info'
import { Participants } from './participants'
import { Toolbar } from './toolbar'
import { CursorsPresence } from './cursors-presence'

export const Canvas = ({ boardId }: { boardId: string }) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({ mode: CanvasMode.None })
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })

  const history = useHistory()
  const canRedo = useCanRedo()
  const canUndo = useCanUndo()

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({ x: camera.x - e.deltaX, y: camera.y - e.deltaY }))
  }, [])

  const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
    e.preventDefault()

    const current = pointerEventToCanvasPoint(e, camera)
    setMyPresence({ cursor: current })
  }, [])

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null })
  }, [])

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
      <svg
        className="h-[100vh] w-[100vw]"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  )
}
