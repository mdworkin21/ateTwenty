import React, {Component} from 'react'
import {Table, Button, Form, Modal, Header } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {getUserFromPassport, getFoodFromLog, deleteItemFromLog} from '../store'
// import Eat from './EmptyLog'
import NavBar from './NavBar';
// import AddFood from './AddFood';
import regeneratorRuntime from "regenerator-runtime";

class Log extends Component {
  constructor(){
    super()
    this.state = {
      addForm: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  } 

   async componentDidMount(){
    await this.props.setUser()

   await this.props.displayFood(this.props.state.user)
   }
  
   handleSubmit(event){
     event.preventDefault()
     this.setState({
       addForm: true
     })
   }

  render(){
    // return this.state.addForm ? <AddFood /> : (
    //   !this.props.state.food.length ? <Eat /> :
      console.log('USERLOG', this.props.state.user)
    return (
  <React.Fragment>
  <Table celled className=".ui.table">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Food</Table.HeaderCell>
        <Table.HeaderCell>Protein</Table.HeaderCell>
        <Table.HeaderCell>Fat</Table.HeaderCell>
        <Table.HeaderCell>Carb</Table.HeaderCell>
        <Table.HeaderCell>Cal</Table.HeaderCell>
        {/* <Table.HeaderCell>Amount (oz)</Table.HeaderCell> */}
        <Table.HeaderCell>Delete</Table.HeaderCell> 
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {
        this.props.state.food.map((item) => {
          return (
            <React.Fragment key={item.id}>
              <Table.Row>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.protein}</Table.Cell>
                <Table.Cell>{item.fat}</Table.Cell>
                <Table.Cell>{item.carb}</Table.Cell>
                <Table.Cell>{item.calories}</Table.Cell>
                {/* <Table.Cell><Form.Input placeholder='2 Wide' width={1} /></Table.Cell> */}
                <Table.Cell>
                  <Button type="button" basic color='red' content='X' className='deleteButton' onClick={(id) => this.props.deleteFood(item.id)}/></Table.Cell>
              </Table.Row>
            </React.Fragment>
            )
        })
      }
    </Table.Body>
    <Table.Footer>
    <Table.Row>
        <Table.HeaderCell colSpan='6'> 
            <Button icon="add" onClick={this.handleSubmit}  />
         </Table.HeaderCell>
    </Table.Row>
    </Table.Footer>
  </Table>
  </React.Fragment>
)
  }

}


const mapStateToProps = (state) => {
  return {
    state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    displayFood: (userId) => dispatch(getFoodFromLog(userId)),
    deleteFood: (id) => {
      dispatch(deleteItemFromLog(id))},
    setUser: () => dispatch(getUserFromPassport())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Log)