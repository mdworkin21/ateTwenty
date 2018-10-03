import React, {Component} from 'react'
import {Grid, Segment} from 'semantic-ui-react'
import {connect} from 'react-redux'


 const CurrentTotal = (props) =>  {
    return (
        <React.Fragment>
          <Grid>
            <Grid.Row>
              <Segment className="display" id="cal">
                Calories<br/><br/>{props.state.cal.toFixed(2)}
              </Segment>

              <Segment className="display" id="protein">
                Protein<br/><br/>{props.state.protein.toFixed(2)}
              </Segment>

              <Segment className="display" id="carb">
                Carb<br/><br/>{props.state.carb.toFixed(2)}
              </Segment>

              <Segment className="display" id="fat"> 
                Fat<br/><br/>{props.state.fat.toFixed(2)}
              </Segment>
              </Grid.Row>
            </Grid>
        </React.Fragment>
      )
    
}

const mapStateToProps = (state) => {
  return {state}
}

export default connect(mapStateToProps)(CurrentTotal)