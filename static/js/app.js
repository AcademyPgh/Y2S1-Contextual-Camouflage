import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Menu from './menu';
import {Image} from 'react-bootstrap';
import autobind from 'class-autobind';

export default class App extends Component {
  constructor(props){
    super(props);
    autobind(this);
    this.state = {
      blur: '',
    };

  }
  handleBlur(event){
    // alert(event);
    let blurry = this.state.blur;
    blurry = 'blur';
    this.setState({blur: blurry});

  }
  render() {
    return (
      <div>
        <Menu getBlurry={this.handleBlur}/>
      <div id="map">
        <Image className= {this.state.blur} src="static/img/C_Camo_Map.png" responsive/>
      </div>

        {this.props.children}

      </div>
    );
  }
}
