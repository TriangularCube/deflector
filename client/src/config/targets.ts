const localStorageName = 'Deflector-API-target'

enum Target {
  Local = 'Local',
  Dev = 'Dev',
  Production = 'Production',
}

const targets = new Map([
  [Target.Local, 'http://localhost:3000'],
  [Target.Dev, '']
])

const saved = localStorage.getItem(localStorageName)
let targetName = saved ? (saved as Target) : Target.Production



let targetUrl = saved ? targets[targetName] : targets.production

export const getTargetUrl = (): string => {
  return targetUrl
}

export const getTargetName = (): string => {
  return targetName
}

export const setTarget = (newTarget: string): void => {
  const newTargetUrl = targets[newTarget]
  if (!newTargetUrl) {
    // Not a valid target
    console.error('Not a valid target')
    return
  }

  targetName = newTarget
  targetUrl = newTargetUrl
  localStorage.setItem(localStorageName, newTarget)
}
