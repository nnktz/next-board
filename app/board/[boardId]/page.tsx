import { Canvas } from './_components/canvas'

const BoardIdPage = ({ params }: { params: { boardId: string } }) => {
  return <Canvas boardId={params.boardId} />
}

export default BoardIdPage
