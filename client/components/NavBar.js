import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Menu, Icon, Item} from 'semantic-ui-react'

class NavBar extends Component {
  constructor(){
    super()
    this.state = {
      link: ''
    }
  }

  render(){
    

    return (
      <Menu icon>
        <Menu.Item name='home'> 
          <Link to="/"> <Icon name='home'/></Link>
        </Menu.Item>

        <Menu.Item name='calculator'> 
        <Link to="/calc"> <Icon name='calculator'/></Link>
        </Menu.Item>

        <Menu.Item name='list alternate outline'> 
          <Link to="/log"><Icon name='list alternate outline'/></Link>
        </Menu.Item>
      </Menu>
    )
  }
}

export default NavBar 