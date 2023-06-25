import React from 'react'

const HamburgerContext = React.createContext({
  hamburgerStatus: false,
  changeStateHamburger: () => {},
})
export default HamburgerContext
