import { createSwaggerSpec } from 'next-swagger-doc'

export async function getApiDocs() {
  const spec = createSwaggerSpec({
    apiFolder: 'app/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'NextJs MVC Simple',
        version: '1.0.0'
      },
      tags: [
        {
          name: 'User',
          description: 'User related endpoints'
        },
        {
          name: 'Post',
          description: 'Post related endpoints'
        }
      ]
    }
  })

  return spec
}
