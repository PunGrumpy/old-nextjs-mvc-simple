import { getApiDocs } from '@/lib/swagger'
import ReactSwagger from './react-swagger'
import { Header } from '@/components/header.component'

export default async function Page() {
  const spec = await getApiDocs()

  return (
    <div className="bg-[url('/images/wallpaper-swagger.png')] min-h-screen text-white">
      <Header />
      <section>
        <div className="container mx-auto py-16">
          <header className="text-center">
            <h1 className="text-4xl font-extrabold mb-8">API Documentation</h1>
          </header>
          <ReactSwagger spec={spec} />
        </div>
      </section>
    </div>
  )
}
