let x = 100

export const Draw = (canvas, context) => {
    context.clearRect(0, 0, canvas.width, canvas.height)

    context.beginPath()
    context.arc(x, 100, 20, 0, 2 * Math.PI)
    context.stroke()

    x += 1
}
