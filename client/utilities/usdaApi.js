import regeneratorRuntime from "regenerator-runtime";
import axios from 'axios'

//Set up for query string && Axios request to get NDB Number
 export const getNDBNumber = async function(foodItem, foodGroup){
  const usdaApiURLSearch = 'https://api.nal.usda.gov/ndb/search/?'
  const apiKey = 'lFerxXHRcBpCKju21iibKnVDjpRnAwaMR0GyUyaP'
  const ndbNumRequest = await axios.get(usdaApiURLSearch + `format=json&q=${foodItem}&sort=r&max=50&offset=0&lt=g&ds=&fg=${foodGroup}&api_key=${apiKey}`)
  return ndbNumRequest
}

//Gets the name from the returned response to getNDBNumber
export function itemNames(ndbNumRequest){
  const itemName = ndbNumRequest.data.list.item
  const names = []
  for (let i = 0; i < itemName.length; i++){
    // let sliceUpTo = itemName[i].name.indexOf('UPC:')
    names.push(itemName[i].name)
    // names.push(sliceUpTo)
    console.log(names)
  }
  return names
}

//Digs into Deeply nested data to pull out nutrition info
export function digOutData(arr) {
  let bucket = [];
  for (let i = 0; i < arr.length; i++) {
    let nutries = {};
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j].name === "Energy") {
        nutries.calories = arr[i][j].value;
      } else if (arr[i][j].name === "Protein") {
        nutries.protein = arr[i][j].value;
      } else if (arr[i][j].name === "Total lipid (fat)") {
        nutries.fat = arr[i][j].value;
      } else if (arr[i][j].name === "Carbohydrate, by difference") {
        nutries.carb = arr[i][j].value;
      }
    }
    bucket.push(nutries);
  }
  return bucket;
}


//Axios Request for nutrition info (this can/should probably be refactored)
export const getNutritionInfo = async function (ndbNumRequest, names){
  const usdaApiURLReport = 'https://api.nal.usda.gov/ndb/reports/?'
  const apiKey = 'lFerxXHRcBpCKju21iibKnVDjpRnAwaMR0GyUyaP'

  const ndbArr = ndbNumRequest.data.list.item
  let ndbs = []
  let allNDBS = []
  ndbArr.forEach((food) => {
    const ndbNum = food.ndbno
    allNDBS.push(ndbNum)
    const nutritionInfoRequest = axios.get(usdaApiURLReport + `ndbno=${ndbNum}&type=b&format=json&api_key=${apiKey}` )
    ndbs.push(nutritionInfoRequest)
    })
  let arrOfndb = await Promise.all(ndbs)
  let nutrientArray = []
  arrOfndb.forEach(nutrients => {
    nutrientArray.push(nutrients.data.report.food.nutrients.slice(0,5))
  })
  let result = digOutData(nutrientArray)

  for (let i = 0; i < names.length; i++){
    result[i].name = names[i]
    result[i].ndbNum = allNDBS[i]
  }
  return result
}




       
  
