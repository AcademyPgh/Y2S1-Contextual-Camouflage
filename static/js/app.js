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
  getDefaultProps(){
    alert(this.props.location.pathname);
    if(this.props.location.pathname == '/Home'){
      this.setState({blur: ''});
    }
    else {
    this.setState({blur: 'blur'});
    }
  }
  handleBlur(event){

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
