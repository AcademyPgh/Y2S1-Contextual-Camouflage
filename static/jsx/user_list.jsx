import React from 'react';

/*List of Active Users */
const UserList = (props) =>{
  return (
       <div>
       <form onKeyPress= {props.handleSubmit}>
         <label>
           Choose a Chatter:
           <select value={props.selectValue} onChange={props.handleChange}>
             {props.users.map((user, i) =>
               { return (<option key= {i} value= {user}>{user}</option>);
             })}
           </select>

         </label>
       </form>
     </div>
     );
};

export default UserList;
