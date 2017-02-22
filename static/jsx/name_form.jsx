import React from 'react';

const NameForm = ({handleUserNameSubmit, handleUserNameChange, textValue}) => {
  return (
        <form onSubmit= {handleUserNameSubmit}>
          <label>
            Name:
            <input type="text" placeholder= "Sign In To Chat" value={textValue} onChange={handleUserNameChange}/>
          </label>
        </form>
      );
};

export default NameForm;
