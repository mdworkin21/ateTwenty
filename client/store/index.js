import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import regeneratorRuntime from "regenerator-runtime";
import axios from 'axios'



//Initial State
//Probably a good idea to make second store with search stuff and maybe a third with profile stuff
const initialState = {
  user: '', //will be an ID num
  searched: false,
  cal: 0,
  carb: 0,
  fat: 0,
  protein: 0,
  food: [],
  fgCode: '',
  measurement: '',
  dailyGoals: {
    calories: "",
    protein: "",
    carb: "",
    fat: ""
  },
  searchimage: ''
}

//Constants for Action Types
const GET_USER = 'GET_USER'
const GET_FOOD_LOG = 'GET_FOOD_LOG'
const ADD_FOOD = 'ADD_FOOD'
const DELETE_FOOD = 'DELETE_FOOD'
const UPDATE_FOOD = 'UPDATE_FOOD'
const GET_FGCODE = 'GET_FGCODE'
const GET_MEASUREMENT = 'GET_MEASUREMENT'
const SET_GOALS = 'SET_GOALS'
const GET_TOTALS = 'GET_TOTALS'
const SEARCH_OCCURRED = 'SEARCH_OCCURED'
const GET_DAILY_GOALS = 'GET_DAILY_GOALS'

//Action Creators

export const getUser = (user) => {
  return {
    type: GET_USER,
    user
  }
}
const getFoodLog = (food) => {
  return {
    type: GET_FOOD_LOG,
    food
  }
}

const getMacTotals = (totals) => {
  return {
    type: GET_TOTALS,
    totals
  }
}

const addFood = (food) => {
  return {
    type: ADD_FOOD,
    food
  }
}

const deleteFood = (id) => {
  return {
    type: DELETE_FOOD,
    id
  }
}

const updateFood = (food) => {
  return {
    type: UPDATE_FOOD,
    food
  }
}

export const getFgCode = (code) => {
  return {
    type: GET_FGCODE,
    code
  }
}

export const getMeasurement = (measure) => {
  return {
    type: GET_MEASUREMENT,
    measure
  }
}

const setDailyGoals = (dailyGoals) => {
  return {
    type: SET_GOALS,
    dailyGoals
  }
}

const getDailyGoals = (dailyGoals) => {
  return {
    type: GET_DAILY_GOALS,
    dailyGoals
  }
}

export const changeSearchedValue = (boolean) => {
  return {
    type: SEARCH_OCCURRED,
    boolean
  }
}

//Thunks
export const getUserFromPassport = () => {
  return async (dispatch) => {
    try{
      const response = await axios.get('/authenticate/getUser')
      const user = response.data
      const action = getUser(user)
      dispatch(action)
    }catch(err){
      console.log(err)
    }
  }
}
export const addFoodToLog = food => {
  return async (dispatch) => {
    try{
      const response = await axios.post('/api/dailyLog', {
        name: food[0].name,
        calories: food[0].calories,
        protein: food[0].protein,
        carb: food[0].carb,
        fat: food[0].fat,
        userId: food[0].user
      })
      const addedFood = response.data
      const action = addFood(addedFood)
       dispatch(action)
    } catch(err){
       console.log(err)
    }
  }
}

export const getFoodFromLog = (id) => {
  return async(dispatch) => {
    try{
      const response = await axios.get(`/api/dailyLog/${Number(id)}`)
      const allFood = response.data
      const action = getFoodLog(allFood)
      dispatch(action)
    } catch(err) {
        console.log(err)
    }
  }
}

export const getFoodTotals = (id) => {
  return async(dispatch) => {
    try{
      const response = await axios.get(`/api/dailyLog/${Number(id)}`)
      const allFood = response.data
      let totals = {
        calories: 0,
        protein: 0,
        carb: 0,
        fat: 0
      }
      allFood.forEach(food => {
        totals.calories += Number(food.calories),
        totals.protein += Number(food.protein),
        totals.carb += Number(food.carb),
        totals.fat += Number(food.fat)
      })
      const action = getMacTotals(totals)
      dispatch(action)
    } catch(err) {
        console.log(err)
    }
  }
}

export const retrieveDailyGoals = (id) => {
  return async (dispatch) => {
    try{
      const userGoals = await axios.get(`/api/userProfile/${id}`)
      const response = userGoals.data
      const action = getDailyGoals(response)
      dispatch(action)
    } catch(err){
        console.log(err)
    }
  }
}

export const deleteItemFromLog = (id) => {
  return async(dispatch) => {
    try{
      await axios.delete(`/api/dailyLog/${id}`)
      const action = deleteFood(id)
      dispatch(action)
    } catch(err){
        console.log(err)
    }
  }
}

export const setDailyGoal = (dailyGoals) => {
  return async(dispatch) => {
    try{
        const response = await axios.post(`/api/userProfile/`, {dailyGoals})
        const setGoals = response.data
        const action = setDailyGoals(setGoals)
        dispatch(action)
    } catch(err){
       console.log(err)
    }
  }
}

//Reducer
function reducer(state = initialState, action){
  switch (action.type){
    case GET_USER:
      return {...state, user: action.user.id}
    case GET_FOOD_LOG:
      return {...state, food: action.food}
    case GET_TOTALS:
      return {
        ...state,
        cal: action.totals.calories,
        protein: action.totals.protein,
        carb: action.totals.carb,
        fat: action.totals.fat,
      } 
    case ADD_FOOD: 
      return ({
        ...state,
        food: [...state.food, {
          cal: state.cal + Number(action.food.calories),
          protein: state.protein + Number(action.food.protein),
          carb: state.carb + Number(action.food.carb),
          fat: state.fat + Number(action.food.fat), 
          food: action.food
        }]
      })
    case DELETE_FOOD:
      const deletedFood = state.food.filter((item) => {
        return item.id === action.id
      })
      return {
        ...state, 
        cal: state.cal - Number(deletedFood[0].calories),
        protein: state.protein + Number(deletedFood[0].protein),
        carb: state.carb + Number(deletedFood[0].carb),
        fat: state.fat + Number(deletedFood[0].fat), 
        food: state.food.filter((item) => {
        return item.id !== action.id
      })}
    case UPDATE_FOOD: 
      return {...state, food: action.food}
    case GET_FGCODE:
      return {...state, fgCode: action.code}
    case GET_MEASUREMENT:
      return {...state, measurement: action.measure}
    case SET_GOALS:
      return( 
        {
          ...state, 
          dailyGoals: {
            calories: action.dailyGoals.calGoal,
            protein: action.dailyGoals.proteinGoal,
            carb: action.dailyGoals.carbGoal,
            fat: action.dailyGoals.fatGoal
          }
        }
      )
    case GET_DAILY_GOALS:
    return {...state, dailyGoals: action.dailyGoals}
    case SEARCH_OCCURRED:
        return {...state, searched: action.boolean}
    default:
      return state
  }
}

//store
const store = createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()))

export default store