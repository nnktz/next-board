'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from 'convex/react'
import { Poppins } from 'next/font/google'
import { Menu } from 'lucide-react'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { cn } from '@/lib/utils'
import { useRenameModal } from '@/store/use-rename-modal'

import { Button } from '@/components/ui/button'
import { Hint } from '@/components/hint'
import { Actions } from '@/components/actions'

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
})

const TabSeparator = () => {
  return <div className="select-none px-1.5 text-neutral-300">|</div>
}

export const Info = ({ boardId }: { boardId: string }) => {
  const data = useQuery(api.board.get, { id: boardId as Id<'boards'> })
  const { onOpen } = useRenameModal()

  if (!data) {
    return <InfoSkelton />
  }

  return (
    <div className="absolute left-2 top-2 flex h-12 items-center rounded-md bg-white px-1.5 shadow-md">
      <Hint label="Go to boards" sideOffset={10}>
        <Button variant={'board'} className="select-none px-2" asChild>
          <Link href={'/'}>
            <Image src={'/images/logo.svg'} alt="logo" width={40} height={40} />

            <span className={cn('ml-2 text-xl font-semibold text-black', font.className)}>
              Board
            </span>
          </Link>
        </Button>
      </Hint>

      <TabSeparator />

      <Hint label="Edit title" sideOffset={10}>
        <Button
          variant={'board'}
          className="px-2 text-base font-normal"
          onClick={() => onOpen(data._id, data.title)}
        >
          {data.title}
        </Button>
      </Hint>

      <TabSeparator />

      <Actions id={data._id} title={data.title} sideOffset={10}>
        <div className="">
          <Hint label="Main menu" sideOffset={10}>
            <Button size={'icon'} variant={'board'}>
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  )
}

export function InfoSkelton() {
  return (
    <div className="absolute left-2 top-2 flex h-12 w-[300px] items-center rounded-md bg-white px-1.5 shadow-md" />
  )
}
