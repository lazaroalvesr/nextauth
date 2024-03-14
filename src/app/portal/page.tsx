import UserList from '@/modules/auth/users/components/user-list'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">Página do Portal</h1>

      <UserList />

      <Link href="/api/logout">Logout</Link>
    </main>
  )
}
