import fauna from 'faunadb'
export const q = fauna.query

export const client = new fauna.Client({
  // Read Only Key
  secret: 'fnAEA7eUfFACCCNmGdwuyh5VkJQiX4WdsDta2_su',
})
