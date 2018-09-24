import React, {Component} from 'react'
import NavBar from './NavBar'
import axios from 'axios'
// import EmptySearch from './EmptySearch';
import SearchResults from './SearchResults';
import regeneratorRuntime from "regenerator-runtime";
// import SearchError from './SearchError';
import { Form, Header, Button, Modal} from 'semantic-ui-react'
import {getNDBNumber, itemNames, digOutData, getNutritionInfo, mapNamesToNDB} from '../utilities/usdaApi'
import DropDownFoodGroups from './FoodGroups';
import {connect} from 'react-redux'
import {changeSearchedValue} from '../store'

//This file's a mess and needs refactoring
class SearchPage extends Component {
  constructor(){
    super()
    this.state = {
      search: "",
      nutrientArr: [],
      names: [],
      options: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
   async handleSubmit(event){
    event.preventDefault();
    try{
      
      //Set up for query string && Axios request to get NDB Number
      let NDBNum = await getNDBNumber(this.state.search, this.props.fgCode)
      
      //Gets the name from the returned response to getNDBNumber
      let items = itemNames(NDBNum)

      //Axios Request for nutrition info
      let nutritionInfo = await getNutritionInfo(NDBNum, items)

      this.props.changeSearchVal(!this.props.searched)
      this.setState({
        search: '',
        nutrientArr: nutritionInfo
      })
    } catch(err){
      //need better err handling. Should render SearchErr component
      alert('Sorry, we don\'t have that')
      this.setState({
        err: true,
        search: ""
      })
      console.log(err)
    }
  }

//This is better than before but still needs work. Probably better way to do this. Maybe Put form in own component
  render(){
        return (
          <React.Fragment>
          
          <Form onSubmit={this.handleSubmit} className="searchBox">
            <Form.Field >
            <input type="text" name="search"  onChange={this.handleChange} value={this.state.search}/>
           
              <Button onClick={this.handleSubmit} icon='search' type="submit" />
           
            </Form.Field>
            
            <DropDownFoodGroups/>
           
          </Form>
       
          <div id="searchResults">
          <SearchResults nutrientArr={this.state.nutrientArr} />
          </div>
        </React.Fragment>
        )
    }
 }

const mapDispatchToProps = (dispatch) => {
 return{
  changeSearchVal: (bool) => dispatch(changeSearchedValue(bool))
} 
   
}

const mapStateToProps = (state) => {
  return {
    searched: state.searched,
    fgCode: state.fgCode 
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)