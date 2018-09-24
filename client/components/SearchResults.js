import React, {Component} from 'react'
import { connect } from 'react-redux'
import { List, Button } from 'semantic-ui-react'
import { addFoodToLog, changeSearchedValue } from "../store";
import regeneratorRuntime from "regenerator-runtime";



class SearchResults extends Component {
  constructor(){
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(id, event) {
    event.preventDefault();
   let addThisFood = this.props.nutrientArr.filter(item => {
      return item.ndbNum === id
    })
    this.props.addFood(addThisFood);
    this.props.changeSearchVal(!this.props.searched)

  }

  render(){
    return (
      <List>
       { this.props.nutrientArr.map(item => {
         return (
           <List.Item key={item.ndbNum}>
             <List.Content>
             <List.Description id="foodName">{item.name}</List.Description>
            <List.Description>Cal {item.calories}</List.Description>
            <List.Description>Pro {item.protein}</List.Description>
            <List.Description>Fat {item.fat}</List.Description>
            <List.Description>Carb {item.carb}</List.Description>
             </List.Content>
             <Button id="addFoodButton" onClick={(event) => this.handleSubmit(item.ndbNum, event)}>Add Food</Button>
            <p id="serving">Per 100 grams</p>
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);
