import { Room } from '@/components/room'
import { Canvas } from './_components/canvas'
import { Loading } from './_components/loading'

const BoardIdPage = ({ params }: { params: { boardId: string } }) => {
  return (
    <Room roomId={params.boardId} fallback={<Loading />}>
      <Canvas boardId={params.boardId} />
    </Room>
  )
}

export default BoardIdPage
