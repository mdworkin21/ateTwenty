import React, {Component} from 'react'
import NavBar from './NavBar'
// import EmptySearch from './EmptySearch';
import SearchResults from './SearchResults';
import regeneratorRuntime from "regenerator-runtime";
// import SearchError from './SearchError';
import { Form, Button, Dropdown} from 'semantic-ui-react'
import {getNDBNumber, itemNames, getNutritionInfo} from '../utilities/usdaApi'
import DropDownFoodGroups from './FoodGroups';
import {connect} from 'react-redux'
import {changeSearchedValue} from '../store'
import {nutritionInfoByMeasurement} from '../utilities/measurementConv'
import MeasurementTypes from './MeasurementSel'



class SearchPage extends Component {
  constructor(){
    super()
    this.state = {
      search: "",
      nutrientArr: [],
      names: [],
      options: [],
      quantity: 0,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClear(event){
    event.preventDefault();
    this.setState({
      nutrientArr: []
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

      //Adjust Nutrition Info Based on quantity and measurement type
      let adjustedNutritionInfo = nutritionInfoByMeasurement(nutritionInfo, this.state.quantity, this.props.measurement)

      this.props.changeSearchVal(!this.props.searched)
      this.setState({
        search: '',
        nutrientArr: adjustedNutritionInfo
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

  render(){
        return (
          <React.Fragment>
          
          <Form onSubmit={this.handleSubmit} className="searchBox">
            <Form.Field >
              <input type="text" name="search"  onChange={this.handleChange} value={this.state.search}/>
              <Button onClick={this.handleSubmit} icon='search' type="submit" />
              <Button onClick={this.handleClear} name='clear' type="submit" />
            </Form.Field>
            
            <Form.Field>
              <input type="number" name="quantity" onChange={this.handleChange} value={this.state.quantity} id='quantity'/>
            </Form.Field>

            <MeasurementTypes />

            <DropDownFoodGroups/>
           
          </Form>
       
          <div id="searchResults">
          <SearchResults nutrientArr={this.state.nutrientArr} />
          </div>
          <NavBar />
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
    fgCode: state.fgCode,
    measurement: state.measurement
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)