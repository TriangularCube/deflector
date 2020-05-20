import React from 'react'

import {
    Divider,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
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
            <div
                style={{
                    flex: 1,
                }}
            >
                {leaderboard.length < 1 ? (
                    <List>
                        <ListItem alignItems='center'>
                            <ListItemText>No entries yet!</ListItemText>
                        </ListItem>
                    </List>
                ) : null}
            </div>
        </div>
    )
}
