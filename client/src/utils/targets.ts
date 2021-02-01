const localStorageName = 'Deflector-API-target'

enum Target {
  Local = 'Local',
  Edge = 'Edge',
  Dev = 'Dev',
  Production = 'Production',
}

const targets = new Map([
  [Target.Local, 'http://localhost:3000'],
  [Target.Edge, 'https://edge.api.deflector.io'],
  [Target.Dev, 'https://dev.api.deflector.io'],
  [Target.Production, 'https://api.deflector.io'],
])

const saved = localStorage.getItem(localStorageName)
let targetName = saved ? (saved as Target) : Target.Production

let targetUrl = saved ? targets.get(targetName) : targets.get(Target.Production)

export const getTargetUrl = (): string => {
  return targetUrl
}

export const getTargetName = (): string => {
  return targetName
}

export const setTarget = (newTarget: Target): void => {
  const newTargetUrl = targets.get(newTarget)
  if (!newTargetUrl) {
    // Not a valid target
    console.error('Not a valid target')
    return
  }

  targetName = newTarget
  targetUrl = newTargetUrl
  localStorage.setItem(localStorageName, newTarget)
}
