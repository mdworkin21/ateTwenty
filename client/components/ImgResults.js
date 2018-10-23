import React from 'react'

const ImgResults = (props) => {
  console.log('PROPS', props.concepts)
  return (
    <React.Fragment>
      {props.concepts.map(element => {
        return <button key={element.id}>{element.name}</button>
      })}
    </React.Fragment>
  )
}

export default ImgResults