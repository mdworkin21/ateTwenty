import React from 'react'
//This might not be best way, we're using threading to pass down method and set state on grandparent. Consider refactor

const ImgResults = (props) => {
  console.log(props.setConcept)
  return (
    <React.Fragment>
      {props.concepts.map(element => {
        return <button key={element.id} onClick={() => props.setConcept(element.name)}>{element.name}</button>
      })}
    </React.Fragment>
  )
}

export default ImgResults