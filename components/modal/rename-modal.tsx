'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { useRenameModal } from '@/store/use-rename-modal'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { api } from '@/convex/_generated/api'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

export const RenameModal = () => {
  const { isOpen, onClose, initialValues } = useRenameModal()
  const { mutate: update, pending } = useApiMutation(api.board.update)

  const [title, setTitle] = useState(initialValues.title)

  useEffect(() => {
    setTitle(initialValues.title)
  }, [initialValues.title])

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault()

    update({ id: initialValues.id, title })
      .then(() => {
        onClose()
        toast.success('Board renamed')
      })
      .catch(() => toast.error('Failed to rename board'))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board title</DialogTitle>
        </DialogHeader>

        <DialogDescription>Enter a new title for this board</DialogDescription>

        <form action="" onSubmit={onSubmit} className="space-y-4">
          <Input
            disabled={pending}
            required
            maxLength={60}
            value={title}
            placeholder="Board title"
            onChange={(e) => setTitle(e.target.value)}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant={'outline'}>
                Cancel
              </Button>
            </DialogClose>

            <Button disabled={pending} type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
