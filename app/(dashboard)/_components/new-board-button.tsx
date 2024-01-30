'use client'

import { Plus } from 'lucide-react'
import { toast } from 'sonner'

import { api } from '@/convex/_generated/api'
import { cn } from '@/lib/utils'
import { useApiMutation } from '@/hooks/use-api-mutation'

interface NewBoardButtonProps {
  orgId: string
  disabled?: boolean
}

export const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const { mutate: create, pending } = useApiMutation(api.board.create)

  const onCreate = () => {
    create({ orgId, title: 'Untitled' })
      .then((id) => {
        toast.success('Board created')
      })
      .catch((err) => toast.error('Failed to create board'))
  }

  return (
    <button
      disabled={disabled || pending}
      onClick={onCreate}
      className={cn(
        'col-span-1 flex aspect-[100/127] flex-col items-center justify-center rounded-lg bg-blue-600 py-6 hover:bg-blue-800',
        (disabled || pending) && 'cursor-not-allowed opacity-75 hover:bg-blue-600',
      )}
    >
      <Plus className="h-12 w-12 stroke-1 text-white" />
      <p className="text-sm font-light text-white">New board</p>
    </button>
  )
}
