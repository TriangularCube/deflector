import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import {
    AppBar,
    ButtonBase,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    ListItemText,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { AccountCircle as AccIcon } from '@material-ui/icons'

const useStyles = makeStyles({
    spacer: {
        flex: 1,
    },
})

export const NavBar = () => {
    const classes = useStyles()

    //region Menu
    const [anchor, setAnchor] = useState(null)
    const openMenu = event => {
        setAnchor(event.currentTarget)
    }
    const closeMenu = () => {
        setAnchor(null)
    }
    //endregion

    return (
        <AppBar position='sticky'>
            <Toolbar>
                <ButtonBase component={Link} to={'/'}>
                    <Typography color='inherit' variant='h5'>
                        Deflector
                    </Typography>
                </ButtonBase>

                <div className={classes.spacer} />

                <div>
                    <IconButton color='inherit' onClick={openMenu}>
                        <AccIcon />
                    </IconButton>

                    <Menu
                        id='account-menu'
                        anchorEl={anchor}
                        getContentAnchorEl={null}
                        open={Boolean(anchor)}
                        onClose={closeMenu}
                        anchorOrigin={{
                            vertical: 30,
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <MenuItem
                            onClick={closeMenu}
                            component={Link}
                            to='/target'
                        >
                            <ListItemText primary='Target Selection' />
                        </MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    )
}
