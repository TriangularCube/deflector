import { getTargetUrl } from './config/target'

export const Draw = (canvas, context) => {
    context.clearRect(0, 0, canvas.width, canvas.height)

    context.beginPath()
    context.arc(100, 100, 20, 0, 2 * Math.PI)
    context.stroke()
}

export const ClickHandler = async evt => {
    console.log(evt.pageX, evt.pageY)
    console.log(evt.target.offsetLeft)

    // TODO: Make this be based on env or a target, or something
    const res = await fetch(getTargetUrl())
    console.log(await res.text())
}
