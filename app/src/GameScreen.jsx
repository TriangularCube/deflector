import React, { useRef, useEffect, useState } from 'react'

import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { ClickHandler, Draw } from './Game'

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    spacer: {
        width: 20,
    },
    sideBar: {
        width: 450,
        backgroundColor: '#FFF156',
    },
})

export const GameScreen = () => {
    const classes = useStyles()

    const [message, setMessage] = useState(null)
    useEffect(() => {
        const eventSource = new EventSource('http://localhost:3000/subscribe')

        eventSource.addEventListener('initial', event => {
            // setMessage(event.data)
            console.log(JSON.parse(event.data))
        })

        eventSource.onerror = () => {
            console.error('SSE Dropped')
        }

        return () => {
            eventSource.close()
        }
    }, [])

    const canvasRef = useRef(null)
    useEffect(() => {
        // TODO: Make canvas size dynamic by querying for screen size

        // Get Canvas Context from the ref
        const canvas = canvasRef.current
        canvas.width = 720
        canvas.height = 720

        const context = canvas.getContext('2d')

        let animationID

        // Define the drawing algorithm
        const draw = timestamp => {
            Draw(canvas, context)
            animationID = requestAnimationFrame(draw)
        }

        // Start drawing
        animationID = requestAnimationFrame(draw)

        // Cancel animation on navigation away
        return () => {
            cancelAnimationFrame(animationID)
        }
    }, [canvasRef.current])

    return (
        <Container maxWidth='lg' className={classes.container}>
            <canvas ref={canvasRef} onClick={ClickHandler} />
            <div className={classes.spacer} />
            <div className={classes.sideBar}>
                <Typography color='inherit' variant='h5'>
                    Side Bar
                </Typography>
                <Typography color='inherit' variant='body2'>
                    {message}
                </Typography>
            </div>
        </Container>
    )
}
