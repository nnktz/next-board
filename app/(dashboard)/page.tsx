'use client'

import { useOrganization } from '@clerk/nextjs'

import { EmptyOrg } from './_components/empty-org'
import { BoardList } from './_components/board-list'

interface DashboardProps {
  searchParams: {
    search?: string
    favorites?: string
  }
}

const DashboardPage = ({ searchParams }: DashboardProps) => {
  const { organization } = useOrganization()

  return (
    <div className="h-full">
      {!organization && <EmptyOrg />}
      {organization && <BoardList orgId={organization.id} query={searchParams} />}
    </div>
  )
}

export default DashboardPage
