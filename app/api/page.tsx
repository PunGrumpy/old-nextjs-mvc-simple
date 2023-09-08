'use client'

import { Header } from '@/components/header.component'
import { apiEndpoints } from '@/lib/api.endpoint'

export default function Page() {
  return (
    <div className="bg-[url('/images/wallpaper-swagger.png')] min-h-screen text-white">
      <Header />
      <main className="max-w-screen-xl mx-auto my-16 py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-indigo-950 p-6 rounded-lg shadow-xl backdrop-blur-lg bg-opacity-80">
          <h2 className="text-3xl font-semibold text-white mb-6">
            Available API Endpoints
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-indigo-400">
                    Method
                  </th>
                  <th className="px-4 py-3 text-left text-indigo-400">Path</th>
                  <th className="px-4 py-3 text-left text-indigo-400">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-indigo-400">
                    Response
                  </th>
                </tr>
              </thead>
              <tbody>
                {apiEndpoints.map((endpoint, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3">{endpoint.method}</td>
                    <td className="px-4 py-3">{endpoint.path}</td>
                    <td className="px-4 py-3">{endpoint.description}</td>
                    <td className="px-4 py-3">{endpoint.response}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
