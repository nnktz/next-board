'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import { formatDistanceToNow } from 'date-fns'
import { MoreHorizontal } from 'lucide-react'
import { toast } from 'sonner'

import { Id } from '@/convex/_generated/dataModel'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { api } from '@/convex/_generated/api'

import { Overlay } from './overlay'
import { Footer } from './footer'
import { Skeleton } from '@/components/ui/skeleton'
import { Actions } from '@/components/actions'

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
  const { mutate: onFavorite, pending: favoritePending } = useApiMutation(api.board.favorite)
  const { mutate: onUnfavorite, pending: unfavoritePending } = useApiMutation(api.board.unfavorite)

  const authorLabel = userId === authorId ? 'You' : authorName
  const createdAtLabel = formatDistanceToNow(_creationTime, { addSuffix: true })

  const toggleFavorite = () => {
    if (isFavorite) {
      onUnfavorite({ id: _id }).catch(() => toast.error('Failed to unfavorite'))
    } else {
      onFavorite({ id: _id, orgId }).catch(() => toast.error('Failed to favorite'))
    }
  }

  return (
    <Link href={`/board/${_id}`}>
      <div className="group flex aspect-[100/127] flex-col justify-between overflow-hidden rounded-lg border">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt={title} fill />
          <Overlay />
          <Actions id={_id} title={title} side="right">
            <button className="absolute right-1 top-1 px-3 py-2 opacity-0 outline-none transition-opacity group-hover:opacity-100">
              <MoreHorizontal className="text-white opacity-75 transition-opacity hover:opacity-100" />
            </button>
          </Actions>
        </div>

        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavorite}
          disabled={favoritePending || unfavoritePending}
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
