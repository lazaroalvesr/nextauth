import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">Homepage do Site</h1>
      <hr />
      <nav>
        <div className="flex gap-4 mt-2">
          <Link href="/portal" className="underline">
            Acesse o Portal
          </Link>
          <p>ou</p>
          <Link href="/portal/sign-up" className="underline">
            Crie uma conta
          </Link>
        </div>
      </nav>
    </main>
  )
}
