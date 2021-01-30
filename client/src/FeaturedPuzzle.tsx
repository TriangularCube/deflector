import React, { FC, ReactElement, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const FeaturedPuzzle: FC = (): ReactElement => {
  const params = useParams()

  useEffect(() => {
    if (!params.id) {

    }
  }, [])

  return <h1>Feature</h1>
}
