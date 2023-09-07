import { getApiDocs } from '@/lib/swagger'
import ReactSwagger from './react-swagger'
import Link from 'next/link'

export default async function Page() {
  const spec = await getApiDocs()

  return (
    <section className="bg-gray-950 min-h-screen text-white font-serif">
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-extrabold text-indigo-400 mb-8">
          API Documentation
        </h1>
        <ReactSwagger spec={spec} />
      </div>
    </section>
  )
}
