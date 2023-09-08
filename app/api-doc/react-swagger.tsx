'use client'

import React from 'react'
import SwaggerUi from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

type Props = {
  spec: Record<string, any>
}

export default function ReactSwagger({ spec }: Props) {
  return (
    <div className="bg-opacity-80 bg-white backdrop-blur-lg rounded-lg shadow-lg p-4 bg-cover transition-transform ease-in-out">
      <SwaggerUi spec={spec} docExpansion="list" deepLinking />
    </div>
  )
}
