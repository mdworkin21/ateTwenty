import React, {Component} from 'react'
import { connect } from 'react-redux'
import { List, Button } from 'semantic-ui-react'
import { addFoodToLog, changeSearchedValue } from "../store";
import regeneratorRuntime from "regenerator-runtime";
import Homepage from './Homepage'
import {Redirect} from 'react-router-dom'


class SearchResults extends Component {
  constructor(){
    super() 
    this.state = {
      redirect: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(id, event) {
    event.preventDefault();
   let addThisFood = this.props.nutrientArr.filter(item => {
      return item.ndbNum === id
    })
    addThisFood[0].user = this.props.user
    this.props.addFood(addThisFood);
    this.props.changeSearchVal(false)
    this.setState({
      redirect: true
    })
  }

  render(){ 
    const { from } = { from: { pathname: "/home" } };    
    if (this.state.redirect) {
      return <Redirect to={from} />;
    }
    return  (
      <List celled>
       { this.props.nutrientArr.map(item => {
         return (
           <List.Item key={item.ndbNum}>
             <List.Content>
              <List.Description id="foodName">{item.name}</List.Description>
              <List.Description>Cal: {item.calories} | Pro: {item.protein} | Fat: {item.fat} | Carb: {item.carb}</List.Description >
             </List.Content>
             <Button id="addFoodButton" onClick={(event) => this.handleSubmit(item.ndbNum, event)}>Add Food</Button>
           </List.Item>
         )
       }) }
      </List>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addFood: food => dispatch(addFoodToLog(food)),
    changeSearchVal: (bool) => dispatch(changeSearchedValue(bool))
  };
};

const mapStateToProps = (state) => {
  return {
    searched: state.searched, 
    user: state.user   
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);
