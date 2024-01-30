import { UserButton } from '@clerk/nextjs'

export const Navbar = () => {
  return (
    <div className="flex items-center gap-x-4 bg-green-500 p-5">
      <div className="hidden bg-yellow-500 lg:flex lg:flex-1">search</div>

      <UserButton />
    </div>
  )
}
