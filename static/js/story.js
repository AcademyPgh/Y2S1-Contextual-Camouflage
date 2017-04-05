import React, {Component} from 'react';
import {FormGroup, ControlLabel, Button, Checkbox, FormControl, Grid, Row, Col} from 'react-bootstrap';

export default class Story extends Component {
  render() {
    return (
      <Grid fluid>
        <Row className="show-grid" >
          <Col xs={18} md={12}>
  <div>
    {/* <div className = "camomap blur"></div> */}

    <div className="overlay">
      {/* <div className="container" id="questionaire"> */}

           <form name= "Story Form" action= 'http://localhost:5000/Share' method='POST'>
             <div className="formContent">
               <div className= 'alignFormText'>
               <p>Do you or a loved one live with a diagnosed mental disorder?
                  Please check all that apply</p>
               <Checkbox name= 'Depression'>
                 Depression
               </Checkbox>
               <Checkbox name= 'Anxiety'>
                 Anxiety
               </Checkbox>
               <Checkbox name= 'Bipolar Disorder'>
                 Bipolar Disorder
               </Checkbox>
               <Checkbox name= 'Dementia'>
                 Dementia
               </Checkbox>
               <Checkbox name= 'Attention Deficit/Hyperactive Disorder'>
                 Attention Deficit/Hyperactive Disorder
               </Checkbox>
               <Checkbox name= "Schizophrenia">
                 Schizophrenia
               </Checkbox>
               <Checkbox name= 'Obsessive Compulsive Disorder'>
                 Obsessive Compulsive Disorder
               </Checkbox>
               <Checkbox name= 'Autism'>
                 Autism
               </Checkbox>
               <Checkbox name= 'Post Traumatic Stress Disorder'>
                 Post Traumatic Stress Disorder
               </Checkbox>
             </div>
            <div id="story">
              <FormGroup controlId="Story">
                <ControlLabel>Share Your Story</ControlLabel>
                <FormControl name= "Story" type= "text" componentClass="textarea" placeholder="Share" />
              </FormGroup>
                <Button type="submit" bsSize="large" bsStyle="danger">Submit</Button>
            </div>
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
