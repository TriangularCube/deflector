import React from 'react'
import { Link } from 'react-router-dom'

import { AppBar, ButtonBase, Toolbar, Typography } from '@material-ui/core'

export const NavBar = () => {
    return (
        <AppBar position='sticky'>
            <Toolbar>
                <ButtonBase component={Link} to={'/'}>
                    <Typography color='inherit' variant='h5'>
                        Deflector
                    </Typography>
                </ButtonBase>
            </Toolbar>
        </AppBar>
    )
}
