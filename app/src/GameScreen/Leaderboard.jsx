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
                        <TextField placeholder='My Name' />
                        <Button>Submit</Button>
                    </div>
                </div>
            </>
        </div>
    )
}
