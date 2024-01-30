import Image from 'next/image'

import { Button } from '@/components/ui/button'

export const EmptyBoards = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image src={'/images/note.svg'} alt="empty boards" height={110} width={110} />

      <h2 className="mt-6 text-2xl font-semibold">Create your first board!</h2>

      <p className="mt-2 text-sm text-muted-foreground">
        Start by creating a board for your organization.
      </p>

      <div className="mt-6">
        <Button size={'lg'}>Create board</Button>
      </div>
    </div>
  )
}
