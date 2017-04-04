import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
// import { BrowserRouter as Router, Route } from 'react-router-dom';

import routes from './static/js/routes';
import ReactDOM from 'react-dom';

import App from './static/js/app';
import Home from './static/js/home';
import Story from './static/js/story';
import Love from './static/js/love';
import Learn from './static/js/learn';
import NotFoundPage from './static/js/not_found';



render(
  <Router routes={routes} history={browserHistory}/>,
  // document.getElementById('root')
  document.querySelector('.root')
)
// render((
//         <Router>
//           <div>
//             <Route path="/" component={App}/>
//             <Route path= "Home" component={Home}/>
//             <Route path="Home/:nameStartsWith" component={Home}/>
//             <Route path= "Story" component={Story}/>
//             <Route path= "Love" component={Love}/>
//             <Route path= "Learn" component={Learn}/>
//             <Route path= "Contact" component= {NotFoundPage}/>
//             <Route path="*" component={NotFoundPage}/>
//           </div>
//         </Router>
//    ), document.querySelector('.root'));
