import React from 'react'
import ReactDOM from 'react-dom'

import { AppBar, CssBaseline, Toolbar, Typography } from '@material-ui/core'

import { About } from './About'

const App = () => {
    return (
        <>
            <CssBaseline />
            <AppBar position='sticky'>
                <Toolbar>
                    <Typography>Deflector</Typography>
                </Toolbar>
            </AppBar>

            <About />
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
