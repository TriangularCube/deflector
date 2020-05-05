import React, { useRef, useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import clsx from 'clsx'

import {
    Container,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Skeleton } from '@material-ui/lab'

import {
    ArrowUpward,
    ArrowBack,
    ArrowForward,
    ArrowDownward,
} from '@material-ui/icons'

import { getTargetUrl } from './config/target'
import { setupGame, setMovePointer } from './Game/gameLogic.ts'

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
        width: 300,
        height: 720,
    },
    sideBarPosition: {
        gridColumn: 2,
        gridRow: 1,
    },
    sideBarFlex: {
        display: 'flex',
        flexDirection: 'column',
    },
    backgroundColour: {
        backgroundColor: '#FFFFFF',
    },
})

const GameArea = props => {
    const classes = useStyles()

    let bottomRef

    const game = props.game
    const canvasRef = useRef(null)
    const [moveHistory, setMoveHistory] = useState(null)
    const [selectedMove, setSelectedMove] = useState(0)

    // TODO Update history, click listener, handle selection, scroll to selection

    useEffect(() => {
        if (!game) {
            return
        }

        // Get Canvas Context from the ref
        const canvas = canvasRef.current

        // Disable Text selection
        canvas.onselectstart = () => false

        // TODO: Canvas Size should depend on the size of game board
        canvas.width = 720
        canvas.height = 720

        setupGame(canvas, game, setMoveHistory)
    }, [game])

    useEffect(() => {
        if (!moveHistory) {
            return
        }
        setSelectedMove(moveHistory.length - 1)
        bottomRef.scrollIntoView({ behavior: 'smooth' })
    }, [moveHistory])

    const selectMove = pointer => {
        setSelectedMove(pointer)
        setMovePointer(pointer)
    }

    return (
        <Container maxWidth='lg' className={classes.container}>
            {/* Game Canvas Area*/}
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

            {/* Side Bar */}
            {game ? (
                // Div for Side Bar
                <div
                    className={clsx(
                        classes.sideBarSize,
                        classes.backgroundColour,
                        classes.sideBarPosition,
                        classes.sideBarFlex
                    )}
                >
                    {/* Heading for Side Bar*/}
                    <Typography color='inherit' variant='h5'>
                        Move History
                    </Typography>

                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        {!moveHistory ? (
                            // Placeholder while moveHistory is initialized
                            'Loading'
                        ) : (
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell align='right'>
                                            Move
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {moveHistory.map((element, index) => {
                                        return (
                                            <TableRow
                                                key={index}
                                                selected={
                                                    index === selectedMove
                                                }
                                                hover
                                                onClick={() => {
                                                    selectMove(index)
                                                }}
                                            >
                                                <TableCell>{index}</TableCell>
                                                <TableCell align='right'>
                                                    {element.move ? (
                                                        <MoveIcon
                                                            colour={
                                                                element.move
                                                                    .colour
                                                            }
                                                            direction={
                                                                element.move
                                                                    .direction
                                                            }
                                                        />
                                                    ) : (
                                                        '-'
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                    <TableRow ref={el => (bottomRef = el)} />
                                </TableBody>
                            </Table>
                        )}
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            placeContent: 'space-between',
                        }}
                    >
                        <Button
                            variant='outlined'
                            color='secondary'
                            onClick={() => {
                                if (!moveHistory) {
                                    return
                                }
                                selectMove(selectedMove - 1)
                            }}
                            disabled={!moveHistory || selectedMove === 0}
                        >
                            Back
                        </Button>
                        <Button
                            variant='outlined'
                            color='primary'
                            onClick={() => {
                                if (!moveHistory) {
                                    return
                                }
                                selectMove(0)
                            }}
                        >
                            Reset
                        </Button>
                        <Button
                            variant='outlined'
                            color='secondary'
                            onClick={() => {
                                if (!moveHistory) {
                                    return
                                }
                                selectMove(selectedMove + 1)
                            }}
                            disabled={
                                !moveHistory ||
                                selectedMove >= moveHistory.length - 1
                            }
                        >
                            Next
                        </Button>
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

const MoveIcon = props => {
    let colour
    switch (props.colour) {
        case 'green':
            colour = '#40f50f'
            break
        case 'blue':
            colour = '#2da3f1'
            break
        case 'red':
            colour = '#ee1616'
            break
        case 'yellow':
            colour = '#e2d80c'
            break
        case 'silver':
            colour = '#7e7c7c'
            break
    }

    let output
    switch (props.direction) {
        case 'north':
            output = <ArrowUpward style={{ color: colour }} />
            break
        case 'east':
            output = <ArrowForward style={{ color: colour }} />
            break
        case 'south':
            output = <ArrowDownward style={{ color: colour }} />
            break
        case 'west':
            output = <ArrowBack style={{ color: colour }} />
            break
    }

    return output
}
