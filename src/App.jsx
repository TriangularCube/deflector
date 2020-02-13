import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { AppBar, CssBaseline, Toolbar, Typography } from '@material-ui/core'

import { About } from './About'
import { Game } from './Game'

const App = () => {
    return (
        <>
            <CssBaseline />
            <AppBar position='sticky'>
                <Toolbar>
                    <Typography>Deflector</Typography>
                </Toolbar>
            </AppBar>

            <Router>
                <Switch>
                    <Route path='/about'>
                        <About />
                    </Route>

                    <Route eaxct path='/'>
                        <Game />
                    </Route>
                </Switch>
            </Router>

        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
