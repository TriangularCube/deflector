import React, { FC, ReactElement, useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { client, q } from '../utils/faunaClient'
import { values } from 'faunadb'

export const ClassicPuzzle: FC = (): ReactElement => {
  const params = useParams<{ id?: string }>()
  const history = useHistory()

  const [loading, setLoading] = useState(true)
  const [puzzle, setPuzzle] = useState<{} | null>(null)

  useEffect(() => {
    const id = params.id
    if (!id || id === 'latest') {
      getLatestPuzzle().then(res => history.replace(`/classic/${res}`))
      return
    }

    getPuzzle(id)
      .then(data => {
        console.log(data)
        setLoading(false)
      })
      .catch(err => console.error(err))
  }, [])

  return <h1>Featured</h1>
}

const getLatestPuzzle = async (): Promise<string> => {
  const ref = (await client.query(
    q.Select(
      ['data', 0, 1],
      q.Paginate(q.Match(q.Index('classic_puzzles_by_time')), { size: 1 })
    )
  )) as values.Ref
  return ref.id
}

const getPuzzle = async (id: string): Promise<{}> => {
  const data = (await client.query(
    q.Get(q.Ref(q.Collection('classic-puzzles'), id))
  )) as values.Document
  return data.data
}
