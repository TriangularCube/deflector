import React from 'react'

import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@material-ui/core'

import { MoveIcon } from './MoveIcon.jsx'
import { setMovePointer } from '../Game/gameLogic.ts'

export const SideBar = props => {
    const { moveHistory, selectedMove } = props

    const selectMove = pointer => {
        props.setSelectedMove(pointer)
        setMovePointer(pointer)
    }

    let topRef

    return (
        <div
            style={{
                flex: 1,
                display: props.hidden ? 'none' : 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
            }}
        >
            <div style={{ flex: 1, overflowY: 'auto' }}>
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
                            {/*<TableRow ref={el => (topRef = el)} />*/}
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
                            <TableRow ref={el => props.setBottomRef(el)} />
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
