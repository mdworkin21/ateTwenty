import React from 'react'
import {Link} from 'react-router-dom'
import {Menu, Icon} from 'semantic-ui-react'

const TopNav = () => {
  return (
    <Menu icon className="div ui menu top">
      <Menu.Item name='plus'> 
        <Link to="/search"> <Icon name='plus'/></Link>
      </Menu.Item>
    </Menu>
  )
}

export default TopNav