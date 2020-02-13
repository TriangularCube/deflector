import React, { useRef, useEffect } from 'react'

import { Container } from '@material-ui/core'

import { Draw } from './Game'

export const GameScreen = () => {
    const canvasRef = useRef(null)
    useEffect(() => {
        // Get Canvas Context from the ref
        const canvas = canvasRef.current
        canvas.width = 640
        canvas.height = 640

        const context = canvas.getContext('2d')

        // Define the drawing algorithm
        const draw = () => {
            Draw(canvas, context)
            requestAnimationFrame(draw)
        }

        // Start drawing
        requestAnimationFrame(draw)
    }, [canvasRef.current])

    return (
        <Container maxWidth='lg'>
            <canvas ref={canvasRef} />
        </Container>
    )
}
