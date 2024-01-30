'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Poppins } from 'next/font/google'
import { OrganizationSwitcher } from '@clerk/nextjs'
import { LayoutDashboard, Star } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
})

export const OrgSidebar = () => {
  const searchParams = useSearchParams()
  const favorites = searchParams.get('favorites')

  return (
    <div className="hidden w-[206px] flex-col space-y-6 pl-5 pt-5 lg:flex">
      <Link href={'/'}>
        <div className="flex select-none items-center gap-x-2">
          <Image src={'/images/logo.svg'} alt="logo" height={60} width={60} />

          <span className={cn('text-2xl font-semibold', font.className)}>Board</span>
        </div>
      </Link>

      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            },
            organizationSwitcherTrigger: {
              padding: '6px',
              width: '100%',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              justifyContent: 'space-between',
              backgroundColor: 'white',
            },
          },
        }}
      />

      <div className="w-full space-y-1">
        <Button
          variant={favorites ? 'ghost' : 'secondary'}
          size={'lg'}
          asChild
          className="w-full justify-start px-2 font-normal"
        >
          <Link href={'/'}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Team boards
          </Link>
        </Button>

        <Button
          variant={favorites ? 'secondary' : 'ghost'}
          size={'lg'}
          asChild
          className="w-full justify-start px-2 font-normal"
        >
          <Link href={{ pathname: '/', query: { favorites: true } }}>
            <Star className="mr-2 h-4 w-4" />
            Favorite boards
          </Link>
        </Button>
      </div>
    </div>
  )
}
