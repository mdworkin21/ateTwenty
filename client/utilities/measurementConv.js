export function gramsToOunces(grams){
  return grams * 0.0352739619
}

export function conversionWithUserInput(quantity, measureType){
  if (measureType === 'oz'){
    return quantity / gramsToOunces(100)
  }
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