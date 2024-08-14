import React, { Component } from 'react'
// import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { TicketProvider } from './pages/TicketContext'

import Header from './components/header'
import Footer from './components/footer'

import Index from './pages/Index'
import News from './pages/News'
import NewsArticle from './pages/NewsArticle'

import Skate from './pages/skate'

import Login from './pages/Login'
import LoginVerify from './pages/LoginVerify'
import LoginRegister from './pages/LoginRegister'
import LoginPassword from './pages/LoginPassword'

import MemberIndex from './pages/MemberIndex'
import MemberEdit from './pages/MemberEdit'
import MemberOrderList from './pages/MemberOrderList'
import MemberOrder from './pages/MemberOrder'
import MemberTickets from './pages/MemberTickets'
import MemberCollection from './pages/MemberCollection'

import EventOrder from './pages/eventOrder'
import EventConfirmInfo from './pages/eventConfirmInfo'
import EventConfirmNoseat from './pages/eventConfirmNoseat'
import EventConfirmSeat from './pages/eventConfirmSeat'
import EventIndex from './pages/eventIndex'
import EventDetail from './pages/eventDetail'
import ProductAll from './pages/ProductAll'

import AboutUs from './pages/about'
import ProductDetail from './pages/ProductDetail'

import Cart from './pages/cart'
import cartCheckOut from './pages/cartCheckOut'
import cartConfirmation from './pages/cartConfirmation'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/index" component={Index} />

            <Route path="/Login/Index" component={Login} />
            <Route path="/Login/Verify" component={LoginVerify} />
            <Route path="/Login/Register" component={LoginRegister} />
            <Route path="/Login/Password" component={LoginPassword} />

            <Route path="/Member/Index" component={MemberIndex} />
            <Route path="/Member/Edit" component={MemberEdit} />
            <Route path="/Member/OrderList" component={MemberOrderList} />
            <Route path="/Member/Order" component={MemberOrder} />
            <Route path="/Member/Tickets" component={MemberTickets} />
            <Route path="/Member/Collection" component={MemberCollection} />

            <Route path="/Event/Order" component={EventOrder} />
            <Route path="/Event/Index" component={EventIndex} />
            <Route path="/Event/Detail" component={EventDetail} />
            <Route path="/Event/ConfirmNoseat" component={EventConfirmNoseat} />
            <Route path="/Event/ConfirmSeat" component={EventConfirmSeat} />
            <Route path="/Event/ConfirmInfo" component={EventConfirmInfo} />

            <Route path="/Product/All" component={ProductAll} />
            <Route path="/Product/Detail" component={ProductDetail} />

            <Route path="/Order/Cart" component={Cart} />
            <Route path="/Order/cartCheckOut" component={cartCheckOut} />
            <Route path="/Order/cartConfirmation" component={cartConfirmation} />

            <Route path="/AboutUs" component={AboutUs} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
