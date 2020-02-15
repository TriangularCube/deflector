import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { CssBaseline } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { About } from './About'
import { GameScreen } from './GameScreen'
import { NavBar } from './NavBar'
import { Target } from './Target'

const useStyles = makeStyles({
    wall: {
        background:
            'linear-gradient(135deg,  #F1F3F4 22px, #FCFCFC 22px, #FCFCFC 24px, transparent 24px, transparent 67px, #FCFCFC 67px, #FCFCFC 69px, transparent 69px),\n' +
            'linear-gradient(225deg,  #F1F3F4 22px, #FCFCFC 22px, #FCFCFC 24px, transparent 24px, transparent 67px, #FCFCFC 67px, #FCFCFC 69px, transparent 69px)0 64px',
        backgroundColor: '#F1F3F4',
        backgroundSize: '64px 128px',
    },
})

const App = () => {
    const classes = useStyles()

    return (
        <div className={classes.wall}>
            <CssBaseline />
            <Router>
                <NavBar />

                <Switch>
                    <Route path='/about'>
                        <About />
                    </Route>

                    <Route path='/target'>
                        <Target />
                    </Route>

                    <Route eaxct path='/'>
                        <GameScreen />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
