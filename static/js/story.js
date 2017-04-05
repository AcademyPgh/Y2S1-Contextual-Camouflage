import React, {Component} from 'react';
import {FormGroup, ControlLabel, Button, Checkbox, FormControl, Grid, Row, Col} from 'react-bootstrap';

export default class Story extends Component {
  render() {
    return (
      <Grid fluid>
        <Row align-middle className="show-grid">
          <Col xs={18} md={12}>
  <div>
    {/* <div className = "camomap blur"></div> */}

    <div className="overlay">
      {/* <div className="container" id="questionaire"> */}
        <p>Do you or a loved one live with a diagnosed mental disorder?
           Please check all that apply</p>
           <form>
             <div className="formContent">
               <Checkbox>
                 Depression
               </Checkbox>
               <Checkbox>
                 Anxiety
               </Checkbox>
               <Checkbox>
                 Bipolar Disorder
               </Checkbox>
               <Checkbox>
                 Dementia
               </Checkbox>
               <Checkbox>
                 Attention Deficit/Hyperactive Disorder
               </Checkbox>
               <Checkbox>
                 Schizophrenia
               </Checkbox>
               <Checkbox>
                 Obsessive Compulsive Disorder
               </Checkbox>
               <Checkbox>
                 Autism
               </Checkbox>
               <Checkbox>
                 Post Traumatic Stress Disorder
               </Checkbox>
            </div>
            <div id="story">
              <FormGroup controlId="Story">
                <ControlLabel>Share Your Story</ControlLabel>
                <FormControl componentClass="textarea" placeholder="textarea" />
              </FormGroup>
              <Button type="Submit" bsSize="large" bsStyle="danger">Submit</Button>
            </div>
      </form>
    </div>
  {/* </div> */}
 </div>
 </Col>
 </Row>
 </Grid>
    );
  }
}
