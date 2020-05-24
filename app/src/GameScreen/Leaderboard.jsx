import React from 'react'

import {
    Typography,
    Table,
    TableBody,
    TableRow,
    TableCell,
} from '@material-ui/core'

export const Leaderboard = props => {
    if (props.hidden) {
        return null
    }

    const { leaderboard } = props

    return (
        <div
            style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                margin: 2,
            }}
        >
            {leaderboard.length < 1 ? (
                <Typography style={{ alignSelf: 'center' }}>
                    No entries yet!
                </Typography>
            ) : (
                <Table>
                    <TableBody>
                        {leaderboard.map((element, index) => (
                            <TableRow key={index} hover>
                                <TableCell>{element.name}</TableCell>
                                <TableCell align='right'>
                                    {element.moveHistory.length - 1}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    )
}
