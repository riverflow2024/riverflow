import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
 
import MemberIndex from './pages/MemberIndex';
import MemberEdit from './pages/MemberEdit';
import MemberOrderList from './pages/MemberOrderList';
import MemberOrder from './pages/MemberOrder';
import MemberTickets from './pages/MemberTickets';
import MemberCollection from './pages/MemberCollection';

import Login from './pages/Login';

import EventIndex from './pages/eventIndex';
import EventDetail from './pages/eventDetail';

 
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/Member/Index" component={MemberIndex} exact />
            <Route path="/Member/Edit" component={MemberEdit} />
            <Route path="/Member/OrderList" component={MemberOrderList} />
            <Route path="/Member/Order" component={MemberOrder} />
            <Route path="/Member/Tickets" component={MemberTickets} />
            <Route path="/Member/Collection" component={MemberCollection} />
            <Route path="/Event/Index" component={EventIndex} />
            <Route path="/Event/Detail" component={EventDetail} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
