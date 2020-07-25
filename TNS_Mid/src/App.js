import React from 'react';
import './App.css';
import {Route,Redirect,Switch,withRouter} from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Reg from './pages/Reg'
import ShopCar from './pages/ShopCar'
import ShopList from './pages/ShopList'
import Mine from './pages/Mine'
import AddArea from './pages/AddArea'
import Address from './pages/Address'
import ChangeUser from './pages/ChangeUser'
import ShopList2 from './pages/ShopList2'
import Shop from './pages/Shop'
import ShopStore from './pages/ShopStore'
import Order from './pages/Order'
import Pay from './pages/Pay'
import Store from './pages/Store'
import PayOrder from './pages/PayOrder'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/home" component={Home}/>
        <Route path="/reg" component={Reg}/>
        <Route path="/login" component={Login}/>
        <Route path="/shoplist" component={ShopList}/>
        <Route path="/shopcar" component={ShopCar}/>
        <Route path="/mine" component={Mine}/>
        <Route path="/addarea" component={AddArea}/>
        <Route path="/address" component={Address}/>
        <Route path="/changeuser" component={ChangeUser}/>
        <Route path="/shoplist2" component={ShopList2}/>
        <Route path="/shop" component={Shop}/>
        <Route path="/shopstore" component={ShopStore}/>
        <Route path="/order" component={Order}/>
        <Route path="/pay" component={Pay}/>
        <Route path="/store" component={Store}/>
        <Route path="/payorder" component={PayOrder}/>
      </Switch>
    </div>
  );
}

export default withRouter(App);
