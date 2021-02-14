import { SSM } from './ssm.js'
const faunaKeyName = `/fauna/FaunaKey-${
  process.env.STAGE === 'production' ? 'production' : 'dev'
}`

const ssm = new SSM([faunaKeyName]) // Spin up a new instance with our list of keys

import faunadb from 'faunadb'
const q = faunadb.query
let client
