import React, {Component} from 'react'
import {Grid, Segment} from 'semantic-ui-react'
import {connect} from 'react-redux'


 const CurrentTotal = (props) =>  {
    return (
        <React.Fragment>
        <Segment >
          <Grid doubling columns={4}>
            <Grid.Row centered >

              <Grid.Column textAlign='center' width={2}>
                <Segment>
                  Calories: {props.state.cal.toFixed(2)}
                </Segment>
                </Grid.Column>

                <Grid.Column textAlign='center' width={2}>
                <Segment>
                  Protein: {props.state.protein.toFixed(2)}
                </Segment>
                </Grid.Column>

                <Grid.Column textAlign='center' width={2}>
                <Segment>
                  Carb: {props.state.carb.toFixed(2)}
                </Segment>
                </Grid.Column>

                <Grid.Column textAlign='center' width={2}>
                <Segment> 
                  Fat: {props.state.fat.toFixed(2)}
                </Segment>

                </Grid.Column>
              </Grid.Row>
            </Grid>
            </Segment>
        </React.Fragment>
      )
    
}

const mapStateToProps = (state) => {
  return {state}
}

export default connect(mapStateToProps)(CurrentTotal)