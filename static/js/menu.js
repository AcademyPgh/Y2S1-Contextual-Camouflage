import React from 'react';
//import { Link } from 'react-router';
import FaIconPack from 'react-icons/lib/fa/phone';
import { Nav, NavItem, Navbar, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

//Menu Component that is connected to the components of our different categories
const Menu = (props) =>
(
  <Navbar fluid staticTop inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <LinkContainer to= "/Home">
        <a href="#">CONTEXTUAL CAMOFLAUGE</a>
        </LinkContainer>
      </Navbar.Brand>
      <Navbar.Toggle/>
  </Navbar.Header>
   <Navbar.Collapse>
    <Nav pullRight bsStyle="pills">
      <LinkContainer to="/Story" onClick={props.getBlurry}>
        <NavItem>Your Story</NavItem>
      </LinkContainer>
      <LinkContainer to="/Love" onClick={props.getBlurry}>
        <NavItem>Send Love</NavItem>
      </LinkContainer>
      <LinkContainer to="/Learn" onClick={props.getBlurry}>
        <NavItem>Learn</NavItem>
      </LinkContainer>
        <LinkContainer to="/Contact" onClick={props.getBlurry}>
      <NavItem><Button bsStyle="danger"><FaIconPack size={20}/></Button></NavItem>
      
      </LinkContainer>
    </Nav>
  </Navbar.Collapse>
</Navbar>
);

export default Menu;
