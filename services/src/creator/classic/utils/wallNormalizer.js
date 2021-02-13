export const normalizer = originalWall => {
  const wall1 = originalWall[0]
  const wall2 = originalWall[1]

  const isHorizontal = wall1[0] === wall2[0]

  const shouldSwap = isHorizontal
    ? wall1[1] > wall2[1]
    : wall1[0] > wall2[0]

  return shouldSwap ? [wall2, wall1] : originalWall
}
