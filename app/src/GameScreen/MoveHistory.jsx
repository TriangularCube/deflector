import React, { useEffect, useState } from 'react'

import {
    Button,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@material-ui/core'

import { getTargetUrl } from '../config/target.js'

import { MoveIcon } from './MoveIcon.jsx'
import { setMovePointer } from '../Game/gameLogic.ts'

export const MoveHistory = props => {
    if (props.hidden) {
        return null
    }

    const { moveHistory } = props
    let topRef
    let bottomRef

    const [selectedMove, setSelectedMove] = useState(0)
    const [nameField, setNameField] = useState('')

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

    const handleNameChange = event => {
        setNameField(event.target.value)
    }

    const lastMove = moveHistory && moveHistory[moveHistory.length - 1]
    const shouldSend = lastMove && lastMove.gameComplete && !lastMove.submitted

    return (
        <div
            style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
            }}
        >
            <div style={{ flex: 1, overflowY: 'auto', height: '100%' }}>
                {!moveHistory ? (
                    // Placeholder while moveHistory is initialized
                    'Loading'
                ) : (
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell />
                                <TableCell align='right'>Move</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody
                            ref={el => (topRef = el)}
                            style={{ scrollMarginTop: '5rem' }}
                        >
                            {moveHistory.map((element, index) => {
                                return (
                                    <TableRow
                                        key={index}
                                        selected={index === selectedMove}
                                        hover
                                        onClick={() => {
                                            selectMove(index)
                                        }}
                                    >
                                        <TableCell>{index}</TableCell>
                                        <TableCell align='right'>
                                            {element.gameComplete && (
                                                <Typography color='primary'>
                                                    Score!
                                                </Typography>
                                            )}
                                        </TableCell>
                                        <TableCell align='right'>
                                            {element.move ? (
                                                <MoveIcon
                                                    colour={element.move.colour}
                                                    direction={
                                                        element.move.direction
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

            {/*{shouldSend && (*/}
            <>
                <Divider />
                <div>
                    <Typography color='textPrimary'>
                        Would you like to submit your score?
                    </Typography>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <TextField
                            placeholder='Name'
                            value={nameField}
                            onChange={handleNameChange}
                        />
                        <Button
                            onClick={() => {
                                submitScore(moveHistory, nameField)
                            }}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
                <Divider />
            </>
            {/*)}*/}

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
                        topRef.scrollIntoView({ behavior: 'smooth' })
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
                        !moveHistory || selectedMove >= moveHistory.length - 1
                    }
                >
                    Next
                </Button>
            </div>
        </div>
    )
}

const submitScore = (moveHistory, name) => {
    fetch(`${getTargetUrl()}/submit`, {
        method: 'POST',
        body: JSON.stringify(moveHistory),
    })
}
