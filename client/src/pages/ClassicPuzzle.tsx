import React, { FC, ReactElement, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const ClassicPuzzle: FC = (): ReactElement => {
  const params = useParams<{ id?: string }>()

  useEffect(() => {
    const id = params.id
    if (!id) {
      getLatestPuzzle()
    } else {
      // TODO
    }
  }, [])

  return <h1>Featured</h1>
}

const getLatestPuzzle = (): string => {
  return ''
}
