import { getTargetUrl } from './config/target'

// Define the drawing algorithm
// const draw = timestamp => {
//     Draw(canvas, context)
//     animationID = requestAnimationFrame(draw)
// }

// Start drawing
// animationID = requestAnimationFrame(draw)

// Cancel animation on navigation away
// return () => {
// cancelAnimationFrame(animationID)
// }

export const EngageDraw = (canvas, game) => {
    canvas.onclick = ClickHandler

    const context = canvas.getContext('2d')

    console.log(game)

    requestAnimationFrame(() => Draw(canvas, context))
}

const Draw = (canvas, context) => {
    context.clearRect(0, 0, canvas.width, canvas.height)

    context.beginPath()
    context.fillStyle = 'green'
    context.rect(0, 0, canvas.width, canvas.height)
    context.fill()

    context.beginPath()
    context.strokeStyle = 'white'
    context.arc(100, 100, 20, 0, 2 * Math.PI)
    context.stroke()
}

const ClickHandler = async evt => {
    console.log(evt.pageX, evt.pageY)
    console.log(evt.target.offsetLeft)

    // TODO: Make this be based on env or a target, or something
    const res = await fetch(`${getTargetUrl()}/submit`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(['Data!']),
    })
    console.log(await res.text())
}
