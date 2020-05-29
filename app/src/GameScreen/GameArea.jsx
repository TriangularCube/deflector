import React, { useEffect, useRef, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Container, Tabs, Tab } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import clsx from 'clsx'

import { setupGame, setMovePointer } from '../Game/gameLogic.ts'
import { MoveHistory } from './MoveHistory.jsx'
import { Leaderboard } from './Leaderboard.jsx'

const useStyles = makeStyles({
    container: {
        display: 'grid',
        paddingTop: 30,
        paddingBottom: 30,
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
        width: 350,
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

export const GameArea = props => {
    const classes = useStyles()

    const [moveHistory, setMoveHistory] = useState(null)
    const [selectedMove, setSelectedMove] = useState(0)
    const [isViewingSolution, setViewingSolution] = useState(false)

    const game = props.game
    const canvasRef = useRef(null)
    const [tabValue, setTabValue] = useState(0)

    useEffect(() => {
        if (!game) {
            return
        }

        readyGame()
    }, [game])

    const makeMove = newHistory => {
        setMoveHistory(newHistory)
        setViewingSolution(false)
    }

    const readyGame = (moveList = null) => {
        // Get Canvas Context from the ref
        const canvas = canvasRef.current

        // Disable Text selection
        canvas.onselectstart = () => false

        // TODO: Canvas Size should depend on the size of game board
        canvas.width = 720
        canvas.height = 720

        setupGame(canvas, game, makeMove, moveList)

        if (moveList) {
            setMovePointer(moveList.length - 1)
            setViewingSolution(true)
        }
    }

    const viewSolution = moveList => {
        readyGame(moveList)
        setTabValue(0)
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
                <div
                    className={clsx(
                        classes.sideBarSize,
                        classes.backgroundColour,
                        classes.sideBarPosition,
                        classes.sideBarFlex
                    )}
                >
                    <Tabs
                        value={tabValue}
                        onChange={(evt, val) => setTabValue(val)}
                        variant='fullWidth'
                    >
                        <Tab label='History' />
                        <Tab label='Leaderboard' />
                    </Tabs>
                    <MoveHistory
                        hidden={tabValue !== 0}
                        moveHistory={moveHistory}
                        gameId={game._id}
                        gameType={game.type}
                        selectedMove={selectedMove}
                        setSelectedMove={setSelectedMove}
                        isViewingSolution={isViewingSolution}
                    />
                    <Leaderboard
                        hidden={tabValue !== 1}
                        viewSolution={viewSolution}
                        leaderboard={game.leaderboard}
                    />
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
