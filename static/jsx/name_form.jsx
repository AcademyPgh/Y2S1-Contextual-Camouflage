import React from 'react';

/*
* Name form for users to sign in and chat *

handleUserNameSubmit = prop function that handles submit
handleUserNameChange = prop function that handles the changing of textValue
textValue = prop state value that updates as user types
*/

const NameForm = (props) => {
  return (
        <form onSubmit= {props.handleUserNameSubmit}>
          <label>
            Name:
            <input type="text" placeholder= "Sign In To Chat" value={props.textValue} onChange={props.handleUserNameChange}/>
          </label>
        </form>
      );
};

export default NameForm;
