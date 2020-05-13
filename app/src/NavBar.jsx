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
import { LocationSearching } from '@material-ui/icons'

export const NavBar = () => {
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

                <div style={{ flex: 4 }} />

                <div>
                    <IconButton color='inherit' onClick={openMenu}>
                        <LocationSearching />
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
