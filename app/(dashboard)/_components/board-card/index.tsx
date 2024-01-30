'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import { formatDistanceToNow } from 'date-fns'
import { Id } from '@/convex/_generated/dataModel'

import { Overlay } from './overlay'
import { Footer } from './footer'
import { Skeleton } from '@/components/ui/skeleton'

interface BoardCardProps {
  _id: Id<'boards'>
  _creationTime: number
  orgId: string
  title: string
  authorId: string
  authorName: string
  imageUrl: string
  isFavorite: boolean
}

export const BoardCard = ({
  _id,
  _creationTime,
  orgId,
  title,
  authorId,
  authorName,
  imageUrl,
  isFavorite,
}: BoardCardProps) => {
  const { userId } = useAuth()

  const authorLabel = userId === authorId ? 'You' : authorName
  const createdAtLabel = formatDistanceToNow(_creationTime, { addSuffix: true })

  return (
    <Link href={`/board/${_id}`}>
      <div className="group flex aspect-[100/127] flex-col justify-between overflow-hidden rounded-lg border">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt={title} fill />
          <Overlay />
        </div>

        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={() => {}}
          disabled={false}
        />
      </div>
    </Link>
  )
}

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] overflow-hidden rounded-lg">
      <Skeleton className="h-full w-full" />
    </div>
  )
}
