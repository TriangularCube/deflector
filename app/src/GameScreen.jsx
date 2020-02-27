import React, { useRef, useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import clsx from 'clsx'

import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Skeleton } from '@material-ui/lab'

import { getTargetUrl } from './config/target'
import { SetupGame } from './Game'

export const GameScreen = () => {
    const [data, setData] = useState({ loading: true })

    // Parse location and redirect if needed
    const location = useLocation()
    const history = useHistory()

    useEffect(() => {
        if (location.pathname === '/') {
            // If this is the root address, redirect to latest Classic
            fetch(`${getTargetUrl()}/latest/classic`)
                .then(res => res.text())
                .then(res => {
                    history.replace(`/puzzle/classic/${res}`)
                })

            return
        }

        // Once we're past redirects

        // Set up the SSE Stream
        const eventSource = new EventSource(
            `${getTargetUrl()}${location.pathname}`
        )

        // Get the initial game state
        eventSource.addEventListener('initial', event => {
            setData({ loading: false, game: JSON.parse(event.data) })
        })

        // TODO: Error handling
        eventSource.onerror = () => {
            console.error('SSE Dropped')
        }

        // Close the connection on navigate away
        return () => {
            eventSource.close()
        }
    }, [location.pathname])

    return <GameArea game={data.loading ? null : data.game} />
}

const useStyles = makeStyles({
    container: {
        display: 'grid',
        paddingTop: 30,
    },
    canvasPosition: {
        gridColumn: 1,
    },
    spacer: {
        width: 20,
    },
    gameAreaSize: {
        width: 720,
        height: 720,
    },
    sideBarSize: {
        width: 450,
        height: 720,
        overflowY: 'auto',
    },
    sideBarPosition: {
        gridColumn: 2,
        gridRow: 1,
    },
    backgroundColour: {
        backgroundColor: '#FFFFFF',
    },
})

const GameArea = props => {
    const classes = useStyles()

    const game = props.game
    const canvasRef = useRef(null)
    const [movelist, setMovelist] = useState(null)

    useEffect(() => {
        if (!game) {
            return
        }

        // Get Canvas Context from the ref
        const canvas = canvasRef.current

        // TODO: Canvas Size should depend on the size of game board
        canvas.width = 720
        canvas.height = 720

        SetupGame(canvas, game, setMovelist)
    }, [game])

    return (
        <Container maxWidth='lg' className={classes.container}>
            {game ? (
                <canvas ref={canvasRef} className={classes.canvasPosition} />
            ) : (
                <Skeleton
                    variant='rect'
                    className={clsx(
                        classes.gameAreaSize,
                        classes.backgroundColour
                    )}
                />
            )}

            <div className={classes.spacer} />

            {game ? (
                <div
                    className={clsx(
                        classes.sideBarSize,
                        classes.backgroundColour,
                        classes.sideBarPosition
                    )}
                >
                    <Typography color='inherit' variant='h5'>
                        Side Bar
                    </Typography>
                    <div>
                        {!movelist
                            ? 'None'
                            : movelist.map((element, index) => (
                                  <div key={index}>
                                      <Typography>{element.piece}</Typography>
                                      <Typography>
                                          {element.direction}
                                      </Typography>
                                  </div>
                              ))}
                    </div>
                </div>
            ) : (
                <Skeleton
                    variant='rect'
                    className={clsx(
                        classes.sideBarSize,
                        classes.backgroundColour
                    )}
                />
            )}
        </Container>
    )
}
