import React, { FC, ReactElement } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { CssBaseline } from '@material-ui/core'

import { Navbar } from './Navbar'
import { Splash } from './pages/Splash'
import { About } from './pages/About'
import { ClassicPuzzle } from './pages/ClassicPuzzle'

const App: FC = (): ReactElement => {
  return (
    <div>
      <CssBaseline />
      <Router>
        <Navbar />

        <Switch>
          <Route path='/about'>
            <About />
          </Route>

          <Route path='/classic/:id?'>
            <ClassicPuzzle />
          </Route>

          <Route exact path='/'>
            <Splash />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
