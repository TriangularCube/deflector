const localStorageName = 'Deflector-API-target'
const targets = {
    local: 'http://localhost:3000',
    production: 'https://api.deflector.io',
}
const saved = localStorage.getItem(localStorageName)

let targetName = saved ? saved : 'local'
let targetUrl = saved ? targets[targetName] : targets.production

export const getTargetUrl = () => {
    return targetUrl
}

export const getTargetName = () => {
    return targetName
}

export const setTarget = newTarget => {
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
