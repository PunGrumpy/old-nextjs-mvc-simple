import { getApiDocs } from '@/lib/swagger'
import ReactSwagger from './react-swagger'

export default async function Page() {
  const spec = await getApiDocs()

  return (
    <section className="bg-[url('/images/wallpaper-swagger.png')] bg-fixed min-h-screen text-white font-serif">
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-extrabold text-white mb-8">
          API Documentation
        </h1>
        <ReactSwagger spec={spec} />
      </div>
    </section>
  )
}
