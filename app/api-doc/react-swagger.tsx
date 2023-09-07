'use client'

import SwaggerUi from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

type Props = {
  spec: Record<string, any>
}

export default function ReactSwagger({ spec }: Props) {
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg p-4">
      <SwaggerUi spec={spec} />
    </div>
  )
}
