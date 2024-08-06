import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import MemberIndex from './pages/MemberIndex'
import MemberEdit from './pages/MemberEdit'
import MemberOderList from './pages/MemberOderList'
import MemberOder from './pages/MemberOder'
import MemberTickets from './pages/MemberTickets'
import MemberCollection from './pages/MemberCollection'
import ProductAll from './pages/ProductAll'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/Member/Index" component={MemberIndex} exact />
            <Route path="/Member/Edit" component={MemberEdit} />
            <Route path="/Member/OderList" component={MemberOderList} />
            <Route path="/Member/Oder" component={MemberOder} />
            <Route path="/Member/Ticket" component={MemberTickets} />
            <Route path="/Member/Collection" component={MemberCollection} />
            <Route path="/Product/All" component={ProductAll} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
