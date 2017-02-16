import React from 'react';

const UserList = ({handleSubmit, selectValue, handleChange, users}) =>{
  return (
       <div>
       <form onKeyPress= {handleSubmit}>
         <label>
           Choose a Chatter:
           <select value={selectValue} onChange={handleChange}>
             {users.map((user, i) =>
               { return (<option key= {i} value= {user}>{user}</option>);
             })}
           </select>

         </label>
       </form>
     </div>
     );
};

export default UserList;
