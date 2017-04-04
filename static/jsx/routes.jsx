import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path= "Home" component={Home}/>
    <Route path="Home/:nameStartsWith" component={Home}/>
    <Route path= "Story" component={Story}/>
    <Route path= "Love" component={Love}/>
    <Route path= "Learn" component={Learn}/>
    <Route path= "Contact" component= {NotFoundPage}/>
    <Route path="*" component={NotFoundPage}/>

  </Route>
);
