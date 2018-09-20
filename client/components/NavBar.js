import React from 'react'
import {Link} from 'react-router-dom'
import {Menu} from 'semantic-ui-react'

const NavBar = () => {
  return (
    <Menu>
        <Link to="/" id="homeLink" className="link">Home</Link>
        <Link to="/calc" id="searchLink" className="link">Calc</Link>
        <Link to="/log" id="searchLink" className="link">Log</Link>
    </Menu>
  )
}

export default NavBar