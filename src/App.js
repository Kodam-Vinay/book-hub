import {Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'

import './App.css'

import Login from './components/Login'
import NotFound from './components/NotFound'
import Home from './components/Home'

import ProtectedRoute from './components/ProtectedRoute'
import HamburgerContext from './Context/HamburgerContext'
import BookShelves from './components/Bookshelves'
import BookCompleteDetails from './components/BookCompleteDetails'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

class App extends Component {
  state = {
    hamburgerButtonStatus: false,
  }

  changeStateHamburger = value => {
    this.setState({hamburgerButtonStatus: value})
  }

  render() {
    const {hamburgerButtonStatus} = this.state
    return (
      <HamburgerContext.Provider
        value={{
          hamburgerButtonStatus,
          changeStateHamburger: this.changeStateHamburger,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/shelf" component={BookShelves} />
          <ProtectedRoute
            exact
            path="/books/:id"
            component={BookCompleteDetails}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </HamburgerContext.Provider>
    )
  }
}
export default App
