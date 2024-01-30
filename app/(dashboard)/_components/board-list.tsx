'use client'

import { EmptyBoards } from './empty-boards'
import { EmptyFavorites } from './empty-favorites'
import { EmptySearch } from './empty-search'

interface BoardListProps {
  orgId: string
  query: {
    search?: string
    favorites?: string
  }
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
  const { search, favorites } = query

  const data = []

  if (!data.length && search) {
    return <EmptySearch />
  }

  if (!data.length && favorites) {
    return <EmptyFavorites />
  }

  if (!data.length) {
    return <EmptyBoards />
  }

  return <div>board list</div>
}
