'use client'

import { useQuery } from 'convex/react'

import { api } from '@/convex/_generated/api'

import { EmptyBoards } from './empty-boards'
import { EmptyFavorites } from './empty-favorites'
import { EmptySearch } from './empty-search'
import { BoardCard } from './board-card'
import { NewBoardButton } from './new-board-button'

interface BoardListProps {
  orgId: string
  query: {
    search?: string
    favorites?: string
  }
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
  const { search, favorites } = query

  const data = useQuery(api.boards.get, { orgId })

  if (data === undefined) {
    return (
      <div>
        <h2 className="text-3xl">{query.favorites ? 'Favorite boards' : 'Team boards'}</h2>

        <div className="mt-8 grid grid-cols-1 gap-5 pb-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          <NewBoardButton orgId={orgId} disabled />

          {Array.from({ length: 4 }).map((_, i) => (
            <BoardCard.Skeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  if (!data.length && search) {
    return <EmptySearch />
  }

  if (!data.length && favorites) {
    return <EmptyFavorites />
  }

  if (!data.length) {
    return <EmptyBoards />
  }

  return (
    <div>
      <h2 className="text-3xl">{query.favorites ? 'Favorite boards' : 'Team boards'}</h2>

      <div className="mt-8 grid grid-cols-1 gap-5 pb-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        <NewBoardButton orgId={orgId} />

        {data.map((board) => (
          <BoardCard key={board._id} {...board} isFavorite={false} />
        ))}
      </div>
    </div>
  )
}
