export const measurementType = [
  {id: 1, key: 'oz', value: 'oz', text: 'oz', category: 'oz'}, 
  {id: 2, key: 'cup', value: 'cup', text: 'cup', category: 'cup'},
  {id: 3, key: 'gram', value: 'gram', text: 'gram', category: 'gram'},
  {id: 4, key: 'pd', value: 'pd', text: 'pd', category: 'pd'}

]



export function gramsToOunces(grams){
  return grams * 0.0352739619
}

export function gramsToCups(grams){
  return grams
}

export function conversionWithUserInput(quantity, measureType){
  if (measureType === 'oz'){
    return quantity / gramsToOunces(100)
  } else if (measureType === 'grams'){
    return quantity / 100 
  } 
  
  // else if (measurementType === 'cups'){
  //   console.log("POOOP")
  // } else if (measurementType =='pd'){
  //   console.log("POOOOOPERSSSS")
  // }
} 

export function nutritionInfoByMeasurement(nutrientArr, quantity, measureType){

  nutrientArr.forEach(element => {
    if(element.calories){
      element.calories = (+element.calories * conversionWithUserInput(quantity, measureType)).toFixed(2)
    } else {
      element.calories = 0
    }

    if(element.protein){
      element.protein = (+element.protein * conversionWithUserInput(quantity, measureType)).toFixed(2)
    } else {
      element.protein = 0
    }

    if(element.fat){
      element.fat = (+element.fat * conversionWithUserInput(quantity, measureType)).toFixed(2)
    } else {
      element.fat = 0
    }

    if(element.carb){
      element.carb = (+element.carb * conversionWithUserInput(quantity, measureType)).toFixed(2)
    } else {
      element.carb = 0
    }
 })

 return nutrientArr
}