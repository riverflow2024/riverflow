import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
 
import MemberIndex from './pages/MemberIndex';

 
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
            <Switch>
             <Route path="/Member/Index" component={MemberIndex} exact/>
             
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;

